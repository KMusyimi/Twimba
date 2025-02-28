import { tweetsData } from "./data.js";
import { v4 as uuidV4 } from 'https://jspm.dev/uuid';

(function ()
{
  const root = document.getElementById("root");
  const HTML = `<header>
  <h1>Twimba</h1>
  </header>
  <main>
  <div class="tweet-input-area">
  <img src="src/assets/images/scrimbalogo.png" class="profile-pic">
  <textarea id='tweet-input' placeholder="What's happening?"></textarea>
  </div>
  <button id="tweet-btn">Tweet</button>
  <div class="feed" id="feed"></div>
  </main>`;

  root.insertAdjacentHTML('beforeend', HTML);

})()
// DOMContentLoaded
window.addEventListener('DOMContentLoaded', function ()
{
  const tweetBtn = document.getElementById('tweet-btn');
  document.addEventListener('click', function (e)
  {
    const { id, dataset } = e.target;
    const { like, retweet, reply } = dataset;
    like && handleLikeClick(like);
    retweet && handleRetweetClick(retweet)
    reply && handleReplyClick(reply);
    if (id === 'tweet-btn')
    {
      handleTweetBtnClick();
    }
  });

  tweetBtn.addEventListener("click", function (e)
  {

  })
  renderTweets();

})


function getFeedHTML(data)
{
  function renderReplies(data)
  {

    return `<div class='hidden' id="replies-${data.uuid}">
      ${data.replies.map(reply =>
    {
      return `<div class="tweet-reply">
                  <div class="tweet-inner">
                      <img src="${reply.profilePic}" class="profile-pic">
                          <div>
                              <p class="handle">${reply.handle}</p>
                              <p class="tweet-text">${reply.tweetText}</p>
                          </div>
                      </div>
                </div>`
    }).join('')}
    </div>`

  }
  return data.map(tweet =>
  {
    return `<div class="tweet">
              <div class="tweet-inner">
                  <img src=${tweet.profilePic} class="profile-pic">
                  <div>
                      <p class="handle">${tweet.handle}</p>
                      <p class="tweet-text">${tweet.tweetText}</p>
                      <div class="tweet-details">
                          <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply='${tweet.uuid}'fsw35></i>${tweet.replies.length}
                          </span>
                          <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${tweet.isLiked ? 'liked' : ''}" data-like='${tweet.uuid}'></i> ${tweet.likes}
                          </span>
                          <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${tweet.isRetweeted ? 'retweeted' : ''}" data-retweet='${tweet.uuid}'></i> ${tweet.retweets}
                          </span>
                      </div>   
                  </div>            
              </div>
              ${tweet.replies.length > 0 ? renderReplies(tweet) : ''}
            </div>`;
  }).join('')

}
function handleTweetBtnClick()
{
  const tweetInput = document.getElementById('tweet-input');

  tweetInput.value !== '' && tweetsData.unshift({
    handle: `@Scrimba`,
    profilePic: `src/assets/images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidV4()
  })
  tweetInput.value = '';
  renderTweets()
}

function handleLikeClick(tweetId)
{
  const likedTweet = tweetsData.filter(tweet => tweet.uuid === tweetId)[0]
  likedTweet.isLiked ? likedTweet.likes-- : likedTweet.likes++;
  likedTweet.isLiked = !likedTweet.isLiked;
  renderTweets()
}
function handleRetweetClick(tweetId)
{
  const tweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
  tweetObj.isRetweeted ? tweetObj.retweets-- : tweetObj.retweets++;
  tweetObj.isRetweeted = !tweetObj.isRetweeted
  renderTweets()
}

function handleReplyClick(replyId)
{
  document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}
function renderTweets()
{
  document.getElementById('feed').innerHTML = getFeedHTML(tweetsData);
}