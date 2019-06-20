import React, { Component } from 'react';
import Avatar, { ConfigProvider }from 'react-avatar';
import StarRatings from 'react-star-ratings';
import './guestNames.css';

class GuestNames extends Component{
    constructor(props) {
        super(props);
        this.state = {
            messages:"",
            star1 : 0,
            star2 : 0,
            star3 : 0,
            star4 : 0,
            star5 : 0,
        };
    }
    componentDidMount() {
        fetch('/api/signatures')
        .then(results => {
            return results.json();
        })
        .then(data => {
            let messages = data.map((msg) => {
                if(msg.rating===1){
                    this.setState({ 
                        star1 : this.state.star1 + 1
                    });        
                }
                else if(msg.rating===2){
                    this.setState({ 
                        star2 : this.state.star2 + 1
                    });        
                }
                else if(msg.rating===3){
                    this.setState({ 
                        star3 : this.state.star3 + 1
                    });        
                }
                else if(msg.rating===4){
                    this.setState({ 
                        star4 : this.state.star4 + 1
                    });        
                }
                else if(msg.rating===5){
                    this.setState({ 
                        star5 : this.state.star5 + 1
                    });        
                }
                return (
                    <div key={msg.results} className="messages-container">
                        <div className="messages-subContainer">
                            <div className="avatar">
                                <ConfigProvider colors={['Brown', 'green', 'blue','LightSeaGreen ']}> 
                                    <Avatar name={msg.guestSignature} size="45px" textSizeRatio="1.7" maxInitials="1" round="25px"/>
                                </ConfigProvider>
                            </div>
                            <div className="signature">
                                <div className="guest-signature"><span className="text-signature">{msg.guestSignature}</span></div>
                                <StarRatings
                                rating={msg.rating}
                                starRatedColor="rgba(129, 129, 129, 1)"
                                starEmptyColor="rgb(189, 189, 189, 0.5)"
                                starSpacing="2px"
                                starDimension='13px'
                                />
                                <div className="guest-message">{msg.message}</div>
                            </div>
                        </div>
                    </div>
                )
            })
            this.setState({messages: messages})
            console.log(this.state.messages)
        
        })
    }
    render() {
        const totalStars = (1*this.state.star1)+(2*this.state.star2)+(3*this.state.star3)+(4*this.state.star4)+(5*this.state.star5);
        const total = this.state.star1+this.state.star2+this.state.star3+this.state.star4+this.state.star5;
        return (
            <div  >
                <div className="header">
                    <div className="ratings">
                        <div className="totalStars">{parseFloat(totalStars/5).toFixed(1)}</div>
                        <div className="starRatings">
                            <StarRatings
                                rating={(totalStars/5)}
                                starEmptyColor="rgb(189, 189, 189, 0.5)"
                                starRatedColor="rgba(129, 129, 129, 1)"
                                starDimension='23px'
                                starSpacing="3px"
                            />
                        </div>
                        <div className="total">{total} reviews</div>
                    </div>
                    <div className="row">
                        <div>
                            <div className="side">5</div>
                            <div className="bar-5" style={{ width: `${((5*this.state.star5)/(5*this.state.star5))*69}%` }}></div>
                        </div>
                        <div>
                            <div className="side">4</div>
                            <div className="bar-4" style={{ width: `${((4*this.state.star4)/(5*this.state.star5))*69}%` }}></div>
                        </div>
                        <div>
                            <div className="side">3</div>
                            <div className="bar-3" style={{ width: `${((3*this.state.star3)/(5*this.state.star5))*69}%` }}></div>
                        </div>
                        <div>
                            <div className="side">2</div>
                            <div className="bar-2" style={{ width: `${((2*this.state.star2)/(5*this.state.star5))*69}%` }}></div>
                        </div>
                        <div>
                            <div className="side">1</div>
                            <div className="bar-1" style={{ width: `${((1*this.state.star1)/(5*this.state.star5))*69}%` }}></div>
                        </div>   
                    </div>
                </div>
                <br/>
                <hr className="hr"/>
                <br/>
                {this.state.messages}
            </div>
        )
    }
}

export default GuestNames;