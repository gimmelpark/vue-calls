export const calculate = (src, des, companiesData, filters) => {
  const pathVariants = getPathsVariants(companiesData)
  const countries = getCountries(pathVariants)
  let countryPaths = []
  calculateCountryPaths([src], countries.filter(el => el !== src), des, countryPaths)
  countryPaths = filterPaths(countryPaths, filters)
  const allPrices = []
  getCallVariants(countryPaths, pathVariants)
    .forEach(routeVariant => {
      calculatePrices(routeVariant, [], allPrices)
    })
  return allPrices
}

const filterPaths = (countryPaths, filters) => {
  if (filters.direct && filters.oneAdditional && filters.twoAdditional) return countryPaths
  return countryPaths
    .filter(el => filters.direct || el.length !== 2)
    .filter(el => filters.oneAdditional || el.length !== 3)
    .filter(el => filters.twoAdditional || el.length !== 4)
}

const calculatePrices = (calls, route, res) => {
  if (!calls.length) {
    addRouteToResults(route, res)
  } else {
    calls[0].prices.forEach(price => {
      calculatePrices(calls.slice(1), [...route, {
        from: calls[0].from,
        to: calls[0].to,
        price: price
      }], res)
    })
  }
}

const addRouteToResults = (route, res) => {
  const total = route.reduce((acc, call) => acc += call.price[1], 0)
  const index = res.findIndex(el => el.total === total && el.route.length > route.length || el.total > total)
  if (index === -1) {
    res.push({route, total})
  } else {
    res.splice(index, 0, {route, total});
  }
}

const calculateCountryPaths = (path, countries, des, res) => {
  if (path[path.length - 1] === des) {
    res.push(path)
    return 0
  } else {
    countries.forEach(el => {
      calculateCountryPaths([...path, el], countries.filter(elem => elem !== el), des, res)
    })
  }
}

const getPathsVariants = (companiesData) => {
  const pathsVariants = []
  companiesData.forEach(company => {
    company.paths.forEach(path => {
      const existIndex = pathsVariants.findIndex(el => el.src === path.src && el.des === path.des)
      if (existIndex === -1) {
        pathsVariants.push({
          src: path.src,
          des: path.des,
          prices: [[company.name, path.price]]
        })
      } else {
        pathsVariants[existIndex].prices.push([company.name, path.price])
      }
    })
  })
  return pathsVariants
}

const getCountries = (pathsVariants) => pathsVariants.reduce((acc, el) => {
  if (acc.includes(el.src) && acc.includes(el.des)) {
    return acc
  }
  if (acc.includes(el.src)) return [...acc, el.des]
  return [...acc, el.src]
}, [])

const getCallVariants = (countryPaths, pathVariants) => {
  const callVariants = []
  countryPaths.forEach((path, j) => {
    const variant = []
    path.forEach((src, i) => {
      if (i < path.length - 1) {
        variant.push({
          from: src,
          to: path[i + 1],
          prices: pathVariants
            .find(el => (el.src === src && el.des === path[i + 1]) || (el.des === src && el.src === path[i + 1]))
            .prices
        })
      }
    })
    callVariants.push(variant)
  })
  return callVariants
}