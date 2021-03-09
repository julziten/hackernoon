import React, { useState, useEffect } from 'react';

import './App.css';

function App() {

  const [data, setData] = useState({});
  const [date, setDate] = useState();
  const [profile, setProfile] = useState({});
  const [totalReactions, setTotalReactions] = useState();
  const [relatedStories, setRelatedStories] = useState([]);
  const [myTags, setTags] = useState([]);

  useEffect(()=> {
    fetch('guide.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      setData(data);
      setDate(convertTimestamp(data.createdAt));
      setProfile(data.profile);
      setTotalReactions(data.reactions.total);
      setRelatedStories(data.relatedStories);
      setTags(data.tags);
    });
  }, [])

  const convertTimestamp = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const milliseconds = date * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("en-US", options);
    return humanDateFormat;
  }

  const onClickEmoji = () => {
    setTotalReactions(totalReactions + 1);
  }

  const storiesImg = relatedStories.map(storie => {
    if (storie.reactionsCount > 0) {
      return (
        <div className="RelatedStories">
          <h2>
            <a href="">{storie.title}</a>
          </h2>
          <div className="RelatedReactions">
            {storie.reactionsCount} reactions
          </div>
          <img src={storie.mainImage}></img>
          <div className="RelatedDetails">
            <div className="Profile">
              <img src={storie.profile.avatar}></img>
              <div>
                <p>@{storie.profile.handle}</p>
                <p>{storie.profile.displayName}</p>
              </div>
            </div>
            <div className="Info">
              <p>{storie.estimatedTime}</p>
              <p>{ storie.createdAt ? convertTimestamp(storie.createdAt) : ''}</p>
            </div>
          </div>
        </div>
      )
    }
  })


  const tags = myTags.map(tag => {
    return <a className="Tag" href={`https://hackernoon.com/tagged/` + tag}>#{tag}</a>
  })


  return (
    <div className="App">
      <h1>{data.title}</h1>
      <div className="InfoTop">
        <a href className="date">{date}</a>
        <div className="Reactions">
          <p>{totalReactions}</p>
          <img className="Emoji"src="https://hackernoon.com/emojis/heart.png" alt="heart" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/light.png" alt="light" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/boat.png" alt="boat" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/money.png" alt="money" onClick={onClickEmoji}></img>
        </div>
      </div>
      <div className="Image">
        <img src={data.mainImage} alt="main"></img>
      </div>

      <div className="Post">
        <div className="Profile">
          <img className="Avatar" src={profile.avatar} alt="avatar"></img>
          <h3>
            <a>@{profile.handle}</a>
            <p>{profile.displayName}</p>
          </h3>
          <p>{profile.bio}</p>
          <div className="SocialMedia">
            <a target="_blank" href={`https://twitter.com/`+ profile.twitter}>
              <img src="https://hackernoon.com/social-icons/twitter-new.png" width="20" height="20" alt="twitter"></img>
            </a>
            <a target="_blank" href={profile.adLink}>
              <img src="https://hackernoon.com/social-icons/github-new.png" width="20" height="20" alt="github"></img>
            </a>
          </div>
        </div>
        <div className="Content"
          dangerouslySetInnerHTML={{
          __html: data.markup
        }}></div>
      </div>
      <div className="Reactions Bottom">
          <p>{totalReactions}</p>
          <img className="Emoji"src="https://hackernoon.com/emojis/heart.png" alt="heart" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/light.png" alt="light" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/boat.png" alt="boat" onClick={onClickEmoji}></img>
          <img className="Emoji" src="https://hackernoon.com/emojis/money.png" alt="money" onClick={onClickEmoji}></img>
      </div>
      <div className="Share">
        <div className="Top">
          <p>Share this story</p>
          <a href="">
            <img src="https://hackernoon.com/social-icons/twitter-new.png" alt="twitter"></img>
          </a>
          <a href="">
            <img src="https://hackernoon.com/social-icons/facebook-new.png" alt="facebook"></img>
          </a>
          <a href="">
            <img src="https://hackernoon.com/social-icons/linkedin-new.png" alt="linkedin"></img>
          </a>
          <a href="" src="https://hackernoon.com/social-icons/email-new.png">
            <img src="https://hackernoon.com/social-icons/email-new.png" alt="email"></img>
          </a>
        </div>
        <div className="Bottom">
          <div className="Profile">
            <img className="Avatar" src={profile.avatar} height="50" width="50" alt="avatar"></img>
              <h3>
                <a>@{profile.handle}</a>
                <p>{profile.displayName}</p>
              </h3>
            </div>
          <div>
          <p>{profile.adText}</p>
          </div>
        </div>
      </div>
      <div className="Related">
        <h4><span>RELATED</span></h4>
        <div className="Box">
          {storiesImg}
        </div>
      </div>
      <div className="Tags">
        <h4><span>TAGS</span></h4>
        {tags}
      </div>
      <div className="Join">
        <a href="https://app.hackernoon.com/signup">
          Join Hacker Noon
        </a>
        <p>Create your free account to unlock your custom reading experience.</p>
      </div>
    </div>
  );
}

export default App;
