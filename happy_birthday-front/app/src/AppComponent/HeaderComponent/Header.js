import React, { Component } from 'react';
const { DateTime } = require("luxon");

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: DateTime.local(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(this.updateTime, 10); // Mettre à jour toutes les secondes
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updateTime = () => {
    this.setState({
      currentTime: DateTime.local(),
    });
  };

  render() {
    const { currentTime } = this.state;
    const currentDate = DateTime.now().setLocale('fr').toFormat('cccc dd MMMM yyyy')


    return (
      <div className="fixed min-w-full bg-white py-6 px-12 flex border-b-2 border-slate-900 place-content-between font-bison text-4xl tracking-wide uppercase">
        <div>
          <h1>Citation et anniversaires</h1>
        </div>
        <div>
          <span>
            {currentDate}| 
            {currentTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
          </span>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;