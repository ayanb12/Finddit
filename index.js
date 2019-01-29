import reddit from './redditapi'

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form event listener
searchForm.addEventListener('submit', e => {
	 //Get search term
	 const searchTerm = searchInput.value;
	 //Get sort
	 const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	 
	 //Get limit
	 const searchLimit = document.getElementById('limit').value

	 //Check input
	 if(searchTerm === '') {
		 //show message
		 showMessage('Please add a search term', 'alert-danger')
	 }
	
	 //Clear input
	 searchInput.value = '';

	 //Search Reddit
	 reddit.search(searchTerm, searchLimit, sortBy)
	 .then(results => {
		//  console.log(results)
		 let output = '<div class="card-columns">'
		results.forEach(post => {
			//Check for image
			const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.vox-cdn.com/thumbor/SfU1irp-V79tbpVNmeW1N6PwWpI=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg';

			output += `
			<div class="card">
			<img src="${image}" class="card-img-top" alt="...">
			<div class="card-body">
			  <h5 class="card-title">${post.title}</h5>
			  <p class="card-text">${truncateText(post.selftext, 100)}</p>
			  <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
			</div>
			<hr>
			<span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
			<span class="badge badge-dark">Subreddit: ${post.score}</span>
		 </div>
			`
		})
		 output += '</div>'
		 document.getElementById('results').innerHTML = output;
	 })

	e.preventDefault()
})

//Show message
function showMessage(message, className) {
	//create the div
	const div = document.createElement('div');
	//Add class
	div.className = `alert ${className}`;
	//Add text
	div.appendChild(document.createTextNode(message));
	//Get parent
	const searchContainer = document.getElementById('search-container');
	//Get search
	const search = document.getElementById('search');

	//Insert the message
	searchContainer.insertBefore(div, search)

	//Timeout alert
	setTimeout(() => {
		document.querySelector('.alert').remove()
	}, 3000)
}

//Truncate text
function truncateText(text, limit) {
	const shortend = text.indexOf(' ', limit)
	if(shortend === -1) return text
	return text.substring(0, shortend)
}

