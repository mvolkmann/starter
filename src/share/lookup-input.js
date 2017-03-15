// @flow
import React, {PropTypes as t} from 'react';

type PropsType = {
  img: string,
  onChange?: () => any,
  onSubmit: () => any
};

type EventType = {
  target: {
    name: string,
    value: string
  }
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

const LookupInput = ({img, onChange, onSubmit}: PropsType) => (
  <div className="lookup-input-container" style={styles.container}>
    <input
      className="form-control lookup-input-input"
      onChange={onChange}
      onKeyPress={(event: EventType) => event.which === 13 ? onSubmit() : null}
      type="text"
      style={styles.input}
    />
    <i
      className={`lookup-input-icon fa fa-${img}`}
      onClick={onSubmit}
      style={styles.icon}
    />
  </div>
);

LookupInput.propTypes = t.shape({
  img: t.string.isRequired,
  onChange: t.func,
  onClick: t.func,
}).isRequired;

export default LookupInput;
