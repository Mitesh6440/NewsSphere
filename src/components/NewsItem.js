import React from 'react'

const NewsItem = (props) => {
  
  return (
      <div>
        <div className="card">
          <img src={!props.imageURL ? "https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : props.imageURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{props.title}... <span className="badge text-bg-secondary">{props.sourceName}</span></h5>
            <p className="card-text">{props.description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {props.author==null?"Unknown":props.author} on {new Date(props.date).toGMTString()}</small></p>
            <a href={props.newsURL} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
  )
}

export default NewsItem;
