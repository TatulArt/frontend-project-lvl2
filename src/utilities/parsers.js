import yaml from 'js-yaml';

const parceData = (data, extention) => {
  if (extention === '.json') {
    return JSON.parse(data);
  }

  return yaml.load(data);
};

export default parceData;
