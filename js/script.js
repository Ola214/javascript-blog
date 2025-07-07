'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const optTagsListSelector = '.tags.list';

const optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';



function clearAllActiveClass() {
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('.post .post-tags .list li a.active');

  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  const authorLinks = document.querySelectorAll('.post .post-author a.active');

  for(let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  }

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

}

// functions for tags

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;


  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');


  clearAllActiveClass();


  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(`.posts article${articleSelector}`);


  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}





function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  /* for each article */
  for (const article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}






function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}


function calculateTagsParams(tags) {

  const params = {
    max: 0,
    min: 999999,
  };

  for(let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}


function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); //.post

  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const tags = article.querySelector(optArticleTagsSelector); //.post-tags .list

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML + '&nbsp;';

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html; //do artykułów

  /* END LOOP: for every article: */
  }

  const tagsParams = calculateTagsParams(allTags);

  for(let tag in allTags) {

    let sizeClass = calculateTagClass(allTags[tag], tagsParams);

    allTagsHTML += '<li><a class="' + sizeClass + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a></li>';

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector); //.tags.list

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;


}




function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector); //.post

  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const author = article.querySelector('.post-author'); //.post-tags .list

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');


    /* START LOOP: for each tag */

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">by ' + articleAuthor + '</a>';

    /* add generated code to html variable */
    html = html + linkHTML + '&nbsp;';

    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
    /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* END LOOP: for each tag */


    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html; //do artykułów

  /* END LOOP: for every article: */
  }

  const authorsParams = calculateTagsParams(allAuthors);

  for(let author in allAuthors) {

    let sizeClass = calculateTagClass(allAuthors[author], authorsParams);

    allAuthorsHTML += '<li><a class="' + sizeClass + '" href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') ' + '</a></li>';
  }

  /* [NEW] find list of tags in right column */
  const authorList = document.querySelector('.authors.list'); //.tags.list

  /* [NEW] add html from allTags to tagList */
  authorList.innerHTML = allAuthorsHTML;


}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('tagClickHandler', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* find all tag links with class active */
  clearAllActiveClass();

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsHref = document.querySelectorAll(`.post-tags .list li a[href="#tag-${tag}"]`);

  /* START LOOP: for each found tag link */
  for(let tagHref of tagsHref) {
    /* add class active */
    tagHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-','');

  clearAllActiveClass();

  const authorsHref = document.querySelectorAll(`.post .post-author a[href="#author-${author}"]`);

  for(let authorHref of authorsHref) {
    authorHref.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}




function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list li a');

  /* START LOOP: for each link */
  for(let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }

  const sideLinks = document.querySelectorAll('.sidebar .tags li a');

  for(let sideLink of sideLinks) {
    sideLink.addEventListener('click', tagClickHandler);
  }
}


function addClickListenersToAuthors() {
  const links = document.querySelectorAll('.post-author a');

  for(let link of links) {
    link.addEventListener('click', authorClickHandler);
  }

  const sideLinks = document.querySelectorAll('.sidebar .authors li a');

  for(let sideLink of sideLinks) {
    sideLink.addEventListener('click', authorClickHandler);
  }
}



generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();
