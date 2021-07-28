export const addElementToObject = (object, key, value) => {
  const newObject = {
    ...object,
    [key]: value,
  };

  return newObject;
};

export const addElementsToArray = (array, ...elements) => [...array, ...elements];
