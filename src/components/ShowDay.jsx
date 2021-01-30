import React from "react";
import { connect } from "react-redux";

const ShowDay = ({ date }) => {
  return <div className="showday">Some info about day</div>;
};

const mapStateToProps = (state) => {
  return { date: state.date };
};

export default connect()(ShowDay);
