const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY

function ensurePexelsKey() {
  if (!pexelsApiKey) {
    throw new Error('Missing VITE_PEXELS_API_KEY in .env')
  }
}

function normalizePexelsPhoto(photo, fallbackAlt = 'Travel image') {
  if (!photo) {
    return null
  }

  return {
    id: photo.id,
    alt: photo.alt || fallbackAlt,
    imageUrl: photo.src?.large2x || photo.src?.large || photo.src?.medium,
    thumbUrl: photo.src?.small || photo.src?.tiny || photo.src?.medium,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsUrl: photo.url,
    provider: 'pexels',
  }
}

function shuffleItems(items) {
  const clonedItems = [...items]

  for (let index = clonedItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[clonedItems[index], clonedItems[swapIndex]] = [clonedItems[swapIndex], clonedItems[index]]
  }

  return clonedItems
}

async function searchPexelsPhotos(query, perPage = 1) {
  ensurePexelsKey()

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    orientation: 'landscape',
  })

  const response = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: {
      Authorization: pexelsApiKey,
    },
  })

  if (!response.ok) {
    throw new Error(`Pexels request failed for query: ${query}`)
  }

  const data = await response.json()

  return (data.photos || [])
    .map((photo) => normalizePexelsPhoto(photo, query))
    .filter((photo) => photo?.imageUrl)
}

async function searchPexelsPhoto(query) {
  const [photo] = await searchPexelsPhotos(query, 1)
  return photo || null
}

function buildActivitySearchQuery(destination, dayTitle, activity) {
  const activityName = activity?.name || 'travel experience'
  const time = activity?.time || 'daytime'
  return `${destination} ${activityName} ${dayTitle || ''} ${time} travel`
}

export async function getDestinationCover(destination) {
  if (!destination) {
    return null
  }

  return searchPexelsPhoto(`${destination} city skyline travel`)
}

export async function getRestaurantImage(destination) {
  if (!destination) {
    return null
  }

  return searchPexelsPhoto(`${destination} restaurant food dining`)
}

export async function getHotelImages(destination, hotelNames = []) {
  if (!destination || hotelNames.length === 0) {
    return []
  }

  const limitedHotels = hotelNames.slice(0, 3)

  return Promise.all(
    limitedHotels.map(async (hotelName) => ({
      name: hotelName,
      image:
        (await searchPexelsPhoto(`${hotelName} ${destination} hotel`)) ||
        (await searchPexelsPhoto(`${destination} luxury hotel stay`)),
    }))
  )
}

export async function getActivityImages(destination, dailyPlan = []) {
  if (!destination || dailyPlan.length === 0) {
    return []
  }

  return Promise.all(
    dailyPlan.map(async (dayPlan) => ({
      day: dayPlan.day,
      activities: await Promise.all(
        (dayPlan.activities || []).map(async (activity) => ({
          name: activity.name,
          image:
            (await searchPexelsPhoto(buildActivitySearchQuery(destination, dayPlan.title, activity))) ||
            (await searchPexelsPhoto(`${destination} sightseeing local experience`)),
        }))
      ),
    }))
  )
}

export async function getDestinationGallery(destination, perPage = 7) {
  if (!destination) {
    return []
  }

  const photos = await searchPexelsPhotos(`${destination} travel landscape city`, perPage)
  return shuffleItems(photos)
}

export async function getPopularDestinationImages(destinations = []) {
  if (!destinations.length) {
    return []
  }

  return Promise.all(
    destinations.map(async (destination) => ({
      name: destination,
      image:
        (await searchPexelsPhoto(`${destination} travel city skyline`)) ||
        (await searchPexelsPhoto(`${destination} landmarks tourism`)),
    }))
  )
}

export async function getTripImages(destination, hotelNames = [], dailyPlan = []) {
  const [destinationCover, restaurantImage, hotelImages, activityImages] = await Promise.all([
    getDestinationCover(destination),
    getRestaurantImage(destination),
    getHotelImages(destination, hotelNames),
    getActivityImages(destination, dailyPlan),
  ])

  return {
    destinationCover,
    restaurantImage,
    hotelImages,
    activityImages,
  }
}
