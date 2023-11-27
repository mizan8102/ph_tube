let all_videos = [];
let isLoading = false;
// call category api 
async function categoryFetch() {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        displayCategories(data.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}


// call all videos card api 
async function videosFetch(id = 1000) {
    try {
        isLoading = true;
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
        const data = await response.json();
        all_videos = data.data;
        isLoading = false;
        displayVideosCard(data.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    } finally {
        isLoading = false;
    }
}

// sorting views number decending 
function viewSorting() {
    const sortedVideos = [...all_videos].sort((a, b) => viewsConvertNumber(b.others.views) - viewsConvertNumber(a.others.views));
    displayVideosCard(sortedVideos);
}

// blog show 
function blogShow() {
    let question = `
    <div class="col-md-12">
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                 Question -1 : Discuss the scope of var, let, and const
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                <div class="accordion-body">
                   Var is functional scope and let , const is block scope.Variable assign with let can be re-initialized but const assign variable cannot be re-initialized value.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  Question -2: Tell us the use cases of null and undefined
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                <div class="accordion-body">
                    Null: It means absence of the value. It is primitive data type. 
                    Undefined: It means the value does not exist in the compiler. It is the global object.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                    Question -3: What do you mean by REST API?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                <div class="accordion-body">
                  API means Application Programmable Interface. RestAPI means REpresentational State Transfer. Basical when we connect one application to another application then we use REST API. In REst api we do many operation using a one route. 
                </div>
              </div>
            </div>
            </div>
        </div>`;
    const videosContainer = document.getElementById('videos');
    const questionsContainer = document.getElementById('catagory');
    questionsContainer.innerHTML = question;
    videosContainer.innerHTML = "";
    document.getElementById('sortingBtn').style.display = 'none';
}

// display videos card 
function displayVideosCard(videos) {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    if (isLoading) {
        const spinnerDiv = document.createElement('div');
        spinnerDiv.classList.add('spinner-border', 'mx-auto', 'my-auto');
        spinnerDiv.setAttribute('role', 'status');
        const visuallyHiddenSpan = document.createElement('span');
        visuallyHiddenSpan.classList.add('visually-hidden');
        visuallyHiddenSpan.textContent = 'Loading...';
        spinnerDiv.appendChild(visuallyHiddenSpan);
        videosContainer.appendChild(spinnerDiv);
    }
    else if (videos.length > 0) {
        videosContainer.innerHTML = '';
        videos.forEach(video => {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('col-md-4', 'mb-4');

            const videoInsideContainer = document.createElement('div');
            videoInsideContainer.classList.add('m-1', 'p-4');
            videoInsideContainer.style.boxShadow = '0 0 20px #ddd';

            const backgroundImageContainer = document.createElement('div');
            backgroundImageContainer.classList.add('position-relative');
            backgroundImageContainer.style.height = '200px';
            backgroundImageContainer.style.backgroundImage = `url(${video.thumbnail})`;
            backgroundImageContainer.style.backgroundPosition = 'center';
            backgroundImageContainer.style.backgroundSize = 'cover';

            const badgeContainer = document.createElement('div');
            badgeContainer.classList.add('position-absolute', 'px-3', 'py-4');
            badgeContainer.style.right = '0';
            badgeContainer.style.bottom = '0';
            badgeContainer.style.left = '0';

            const badge = document.createElement('span');
            badge.classList.add('badge', 'rounded-pill', 'bg-dark', 'float-end');
            badge.textContent = postedTime(video?.others?.posted_date);

            badgeContainer.appendChild(badge);
            backgroundImageContainer.appendChild(badgeContainer);

            const rowContainer = document.createElement('div');
            rowContainer.classList.add('row', 'p-3');

            const colImageContainer = document.createElement('div');
            colImageContainer.classList.add('col-2');

            const image = document.createElement('img');
            image.src = video.authors[0]?.profile_picture;
            image.classList.add('rounded-circle');
            image.style.height = '40px';
            image.style.width = '40px';

            colImageContainer.appendChild(image);
            const colTextContainer = document.createElement('div');
            colTextContainer.classList.add('col-10');

            const title = document.createElement('h5');
            title.textContent = video.title;

            const authorContainer = document.createElement('div');
            authorContainer.classList.add('d-flex', 'items-center')

            const author = document.createElement('p');
            author.style.fontSize = '11px';
            author.style.marginRight = '8px';

            author.textContent = video.authors[0].profile_name;
            authorContainer.appendChild(author);

            const verified = document.createElement('i');
            verified.style.color = 'blue';
            verified.classList.add('bi', 'bi-patch-check-fill');

            if (video?.authors[0]?.verified) {
                authorContainer.appendChild(verified);
            }

            const views = document.createElement('p');
            views.style.fontSize = '11px';
            views.classList.add('text-secondary');
            views.textContent = `${video.others.views} views`;

            colTextContainer.appendChild(title);
            colTextContainer.appendChild(authorContainer);
            colTextContainer.appendChild(views);

            rowContainer.appendChild(colImageContainer);
            rowContainer.appendChild(colTextContainer);

            videoInsideContainer.appendChild(backgroundImageContainer);
            videoInsideContainer.appendChild(rowContainer);
            videoContainer.appendChild(videoInsideContainer);
            videosContainer.appendChild(videoContainer);
        });
    } else {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('col-md-12', 'mb-4', 'd-flex', 'align-items-center');

        const notfoundImg = document.createElement('img');
        notfoundImg.src = '../assets/images/Icon.png';
        notfoundImg.classList.add('mt-5', 'mx-auto');
        notfoundImg.style.width = '15%';

        const titleNotFound = document.createElement('h4');
        titleNotFound.textContent = 'OOPs! Sorry there is no content here';
        titleNotFound.classList.add('text-center', 'mt-3')

        videosContainer.appendChild(notfoundImg);
        videosContainer.appendChild(titleNotFound);
    }

}

// display category
function displayCategories(categories) {
    const container = document.getElementById('catagory');
    container.innerHTML = '';

    categories.forEach((category, index) => {
        const span = document.createElement('span');
        span.classList.add('badge', 'bg-secondary', 'mx-2');
        span.textContent = category.category;
        span.style.cursor = 'pointer';
        if (index === 0) {
            span.classList.add('bg-danger');
        }

        span.addEventListener('click', () => {
            span.classList.toggle('bg-danger');
            document.querySelectorAll('.badge').forEach(element => {
                if (element !== span) {
                    element.classList.remove('bg-danger');
                }
            });
            videosFetch(category.category_id);
            console.log(category.category_id);
        });

        container.appendChild(span);
    });
}

// second to hrs and minute 
function postedTime(timeInSeconds) {
    const years = Math.floor(timeInSeconds / (365 * 24 * 3600));
    const months = Math.floor((timeInSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
    const days = Math.floor((timeInSeconds % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    let result = '';
    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        result += `${months} month${months > 1 ? 's' : ''} `;
    }
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        result += `${hours} hr${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
        result += `${minutes} min${minutes > 1 ? 's' : ''} `;
    }
    if (result === '') {
        return '';
    } else {
        return result + 'ago';
    }
}

// view k to convert number 
function viewsConvertNumber(str) {
    if (str.endsWith('K')) {
        return parseFloat(str.replace('K', '')) * 1000;
    } else {
        return parseFloat(str);
    }
}

// call initial 
categoryFetch();
videosFetch();