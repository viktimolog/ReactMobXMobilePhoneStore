import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const LinkButton = props => {
  const {history, location, match, staticContext, to, ...rest} = props;
  return <button {...rest} onClick={() => history.push(to)}/>;
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired
};

export default withRouter(LinkButton);