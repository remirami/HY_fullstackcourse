import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject);
};
export default { getAll, create, deletePerson, updatePerson };
