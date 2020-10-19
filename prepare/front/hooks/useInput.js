import { useState, useCallback } from 'react';

export default ({ initialValue = null }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [value],
  );
  return [value, handleChange, setValue];
};
