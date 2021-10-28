var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
var formData = document.getElementById('userInputData');
formData.addEventListener('submit', function(event) {
  event.preventDefault();
  var userInput = document.getElementById("searchUser").value; 
  var originName = userInput.split('').join('');

  var url = 'https://api.github.com/users/';
  var responsePromise = fetch(url+ originName);
  responsePromise
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    console.log(jsonData);
    onCreateUser(jsonData);
    
  })
  .catch(function(error){
    alert(error.message);
  })

});
function onCreateUser(jsonData){
  if(jsonData.message === 'Not Found'){
    console.log(jsonData.message)
    document.getElementById('error-notifications').style.display='flex';
    document.getElementById('user-result').style.display = "none";
    document.getElementById('repoOuter').innerHTML = "not found";
  }else{
    document.getElementById('repoOuter').innerHTML = "";
    console.log('check====>',jsonData);
    onRetrieveRepos(jsonData.login);
    document.getElementById('error-notifications').style.display = 'none';
    document.getElementById('user-result').style.display = "flex";
    document.getElementById('userAvatar').src = jsonData.avatar_url;
    document.getElementById('company').innerText = jsonData.company;
    document.getElementById('website_blog').innerText = jsonData.blog;
    document.getElementById('website_blog').href = jsonData.blog;
    document.getElementById('location').innerText = jsonData.location;
    document.getElementById('member_duration').innerText = jsonData.created_at.substring(0, 10);
    document.getElementById('public_repos').innerText = jsonData.public_repos;
    document.getElementById('public_gists').innerText = jsonData.public_gists;
    document.getElementById('following').innerText = jsonData.following;
    document.getElementById('followers').innerText = jsonData.followers;
  }
}
function onRetrieveRepos(username){
  var url = 'https://api.github.com/users/';
  var responsePromise = fetch(url+ username + '/repos');
  responsePromise
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    console.log(jsonData);
    renderRepos(jsonData);
    
  })
  .catch(function(error){
    alert(error.message);
  })
}
function renderRepos(jsonData){
  jsonData.forEach(ele => {
    createDiv(ele);
  });
}
function createDiv(repo){
  document.getElementById('repos-container').style.display = 'block';
  const div = document.createElement("div");
  div.setAttribute("class", "repo-nth-child");
  div.setAttribute("id", "repo-nth-child-info");
  var repoOuter = document.getElementById('repoOuter');
  repoOuter.appendChild(div);
  const titleRepo = document.createElement("a");
  titleRepo.innerText = repo.name;
  titleRepo.href = repo.html_url;
  titleRepo.setAttribute('class', 'repo-title')
  return div.appendChild(titleRepo);
}