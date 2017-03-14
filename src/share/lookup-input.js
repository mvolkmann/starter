import React, {PropTypes as t} from 'react';

type LookupInputPropsType = {
  img: string,
  onChange?: () => any,
  onClick?: () => any,
  onKeyPress?: () => any
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'relative',
    flex: '1 1 0px',
    left: '-20px',
  },
  input: {
    width: '90%',
    flex: '9 9 0px',
    paddingRight: '32px',
  },
};

const LookupInput = (
  {img, onChange, onClick, onKeyPress}: LookupInputPropsType,
) => (
  <div className="lookup-input-container" style={styles.container}>
    <input
      className="form-control lookup-input-input"
      onChange={onChange}
      onKeyPress={onKeyPress}
      type="text"
      style={styles.input}
    />
    <i
      className={`lookup-input-icon fa fa-${img}`}
      onClick={onClick}
      style={styles.icon}
    />
  </div>
);

LookupInput.displayName = 'LookupInput';

LookupInput.propTypes = t.shape({
  img: t.string.isRequired,
  onChange: t.func,
  onClick: t.func,
  onKeyPress: t.func,
}).isRequired;

export default LookupInput;
