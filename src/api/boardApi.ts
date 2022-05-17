import axios from 'axios';
import urls from '../constants/urls';
import columnDataType from '../types';

const token = '';

const getBoardById = (boardId: string) => {
  return axios.get(`${urls.BOARDS}/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getAllColumns = (boardId: string) => {
  return axios.get(`${urls.BOARDS}/${boardId}/columns`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getColumnById = (boardId: string, columnId: string) => {
  return axios.get(`${urls.BOARDS}/${boardId}/columns/${columnId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const createColumn = (boardId: string, columnData: columnDataType) => {
  return axios.post(
    `${urls.BOARDS}/${boardId}/columns`,
    { ...columnData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const deleteColumn = (boardId: string, columnId: string) => {
  return axios.delete(`${urls.BOARDS}/${boardId}/columns/${columnId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateColumn = (boardId: string, columnId: string, columnData: columnDataType) => {
  return axios.patch(
    `${urls.BOARDS}/${boardId}/columns/${columnId}`,
    { ...columnData },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  getBoardById,
  getAllColumns,
  getColumnById,
  createColumn,
  deleteColumn,
  updateColumn,
};
