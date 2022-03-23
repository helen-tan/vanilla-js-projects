const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

// Show loader & fetch more posts
function showLoading() {
    loading.classList.add('show');


    // Loader to fade out
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);

    }, 1000);
}

// Filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post'); // returns a NodeList

    posts.forEach(post => {
        // Get the text in a post's title
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        // Get the text in a post's body
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > 1 || body.indexOf(term) > -1 ){ // If there is a match on the title or body 
            post.style.display = 'flex';
        } else { // no match
            post.style.display = 'none';
        }
    });
}

// Show initial posts
showPosts();


// Event Listeners
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = 
    document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight -5) {
        // Show loader
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);
