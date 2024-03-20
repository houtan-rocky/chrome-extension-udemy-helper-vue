async function getCourseDataFromServer(id) {
  try {
    const res = await fetch(
      `https://www.udemy.com/api-2.0/courses/${id}/?fields[course]=created,title`,
      {
        method: 'GET',
        headers: {}
      }
    )
    return await res.json()
  } catch (e) {
    console.warn('Error fetching creation date')
  }
}

async function renderTitle() {
  const id = document.body.getAttribute(`data-clp-course-id`)
  const courseData = await getCourseDataFromServer(id)
  const creationDateTime = new Date(courseData['created'])
  const creationDate = creationDateTime.toLocaleDateString()
  const courseTitle = document.querySelector('[data-purpose="lead-title"]')
  courseTitle.innerHTML += `<br> <span style="color: green"> Creation Date: ${creationDate} </span>`
  return 0
}

setTimeout(() => {
  renderTitle().catch(() => console.warn('Can not render creation date.'))
}, 2000)
