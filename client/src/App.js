import React, { Component} from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import './guestBook.css';
import './App.css';
import GuestNames from "./guestNames.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.handleSignatureOfGuest = this.handleSignatureOfGuest.bind(this);
        this.handleMessageofGuest = this.handleMessageofGuest.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.canBeSubmitted = this.canBeSubmitted.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.state = {
          showPopup: false,
          SignatureOfGuest: "",
          MessageofGuest: "",
          NoOfStars : 0
        };
    }

    togglePopup(){
        this.setState({
          showPopup : !this.state.showPopup
        });
    }
    handleSignatureOfGuest(event) {
        this.setState({ SignatureOfGuest: event.target.value });
    }
    handleMessageofGuest(event) {
          this.setState({ MessageofGuest: event.target.value });
    }
    changeRating(nextValue, prevValue, name ) {
        this.setState({
          NoOfStars : nextValue
        });
    }
    canBeSubmitted(){
        return this.state.SignatureOfGuest.length > 0 && this.state.MessageofGuest.length > 0 && this.state.NoOfStars > 0;
    }

    addToGuestBook = event => {
        event.preventDefault();
        if (!this.canBeSubmitted()) {
          return;
        }
        axios.post('/api/signatures', {
          SignatureOfGuest: this.state.SignatureOfGuest,
          MessageofGuest: this.state.MessageofGuest,
          NoOfStars: this.state.NoOfStars
        }).then(response => {
          console.log(response, 'Signature added!');
        }).catch(err => {
          console.log(err, 'Signature not added, try again');
        });
        alert(`Thanks ${this.state.SignatureOfGuest} ! Your review has been submitted.`);
        this.setState({
          SignatureOfGuest: "",
          MessageofGuest: "",
          NoOfStars: 0,
          showPopup : !this.state.showPopup
        });
    };

    render(){
        const dialog = ["Hated it", "Didn't like it", "Just OK", "Liked it", "Loved it"];
        const isEnabled =  this.canBeSubmitted();
        return (
            <div class="guestbook-container">
                <div className="navbar">
                    <div className="mern-guestbook">RATE REVIEWS</div>
                    <button onClick={this.togglePopup} className="writeReviewButton">Write a Review</button>
                    {this.state.showPopup ? 
                        <div className='popup'>
                            <div className="form">
                                <p className="rateAndReview">Rate and Review</p>
                                <form onSubmit={this.addToGuestBook}>
                                <input
                                    onChange={this.handleSignatureOfGuest}
                                    className="NameinputForm"
                                    value={this.state.SignatureOfGuest}
                                    placeholder="Name"
                                /><br/>
                                <textarea
                                    onChange={this.handleMessageofGuest}
                                    className="MessageinputForm"
                                    value={this.state.MessageofGuest}
                                    placeholder="Tell others what you think about this app. Would you recommend it, and why?"
                                /><br/>
                                <div className="starRatings"> 
                                    <StarRatings
                                        rating={this.state.NoOfStars}
                                        starRatedColor="rgb(104, 159, 56)"
                                        starHoverColor="rgb(104, 159, 56)"
                                        starSpacing="8px"
                                        changeRating={this.changeRating}
                                        name='rating'
                                        starDimension='37px'
                                        className="starRatings"
                                    />
                                    <span className="dialog">{dialog[this.state.NoOfStars-1]}</span>
                                </div>
                                <button onClick={this.togglePopup} className="cancelButton">CANCEL</button>
                                <button
                                    className="submitbuttonguestbook"
                                    type="submit"
                                    disabled={!isEnabled}
                                >
                                SUBMIT
                                </button>
                                </form>
                            </div>
                        </div>
                        : null
                    }
                </div>
                {!this.state.showPopup ?
                    <GuestNames/>
                    : null
                }
            </div>
        )
    }
}

export default App;
