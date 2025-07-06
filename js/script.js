'use strict';

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

function titleClickHandler(event){
  event.preventDefault();

  console.log('Link was clicked!');
  console.log(event);

  const clickedElement = this;


  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');


  clearAllActiveClass();


  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('article selector', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(`.posts article${articleSelector}`);
  console.log('targetArticle: ',targetArticle);


  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  // articles = document.querySelectorAll(optArticleSelector),
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  console.log('generateTitleLinks.articles', articles);
  console.log('optArticleSelector + customSelector', optArticleSelector + customSelector);
  console.log('optTitleListSelector', optTitleListSelector);

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
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


/* */

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    // console.log('generateTags.article', article);

    /* find tags wrapper */
    const tags = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>&nbsp;';

      /* add generated code to html variable */
      html = html + linkHTML;

    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function generateTags2() {
  const tags = document.querySelectorAll('.sidebar .tags li a');

  for(let tag of tags) {
    tag.setAttribute('href', `#tag-${tag.innerHTML}`);
  }
}

generateTags2();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){
    // console.log('generateTags.article', article);

    /* find authors wrapper */
    const author = article.querySelector('.post-author');

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-authors attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">by ' + articleAuthor + '</a>&nbsp;';

    /* add generated code to html variable */
    html = html + linkHTML;

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateAuthors();

function generateAuthors2() {
  const authors = document.querySelectorAll('.sidebar .authors li a');

  for(let author of authors) {
    author.setAttribute('href', `#author-${author.firstElementChild.innerHTML}`);
  }
}

generateAuthors2();


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
  // console.log('addClickListenersToTags.links', links);

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

addClickListenersToTags();


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

addClickListenersToAuthors();
