const nombreMolinos = (nombre) => {
  if (nombre === 'SAG 16') {
    return 'MOLINO 1';
  } if (nombre === 'SAG 17') {
    return 'MOLINO 2';
  } if (nombre === 'RECUPERACIÓN') {
    return 'MOLINO 3';
  }
};

export default nombreMolinos;
