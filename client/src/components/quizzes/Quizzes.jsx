/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  FormControl, InputLabel, Select, MenuItem, MenuIcon,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuizBackground from './assets/Question.png';
import './Quizzes.css';
import { orange } from '@mui/material/colors';

export default function Quizzes() {
  // set state variables below:
  const fakeData = ['https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
    'https://images.unsplash.com/photo-1627856014754-2907e2355d34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2047&q=80'];
  const moarData = ['https://www.dictionary.com/e/wp-content/uploads/2020/01/WisdomvsKnowledge_1000x700_jpg_OHVUvmTo.jpg', 'https://i0.wp.com/www.edulastic.com/blog/wp-content/uploads/2017/04/Brain_neurons_3720x2631.jpeg?resize=550%2C389&ssl=1', 'https://www.stockvault.net/data/2019/08/28/268988/preview16.jpg'];
  const [allDifficulty, setAllDifficulty] = useState([]);
  const [difficultyQuizzes, setDQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [categoryQuizzes, setCQuizzes] = useState([]);
  const [category, setCategory] = useState('Animals');
  const [toggle, setToggle] = useState(true);
  const [trigger, setTrigger] = useState(true);
  const [indices, setIndices] = useState([0, 1, 2, 3]);
  const [counter, setCounter] = useState(0);

  const leftArrow = () => {
    if (indices[0] > 0) {
      const arr = indices.slice(0, 3);
      arr.unshift(indices[0] - 1);
      setIndices(arr);
      setCounter(counter + 1);
    }
  };

  const rightArrow = () => {
    const last = allDifficulty.length - 1;
    if (indices[3] < last) {
      const arr = indices.slice(1);
      arr.push(indices[3] + 1);
      setIndices(arr);
      setCounter(counter + 1);
    }
  };

  const pageLink = (e) => {
    localStorage.setItem('quizID', e.target.id);
  };
  const cSelector = (e) => {
    setCategory(e.target.value);
    setTrigger(true);
  };
  const dSelector = (e) => {
    setDifficulty(e.target.value);
    setToggle(true);
  };
  // use Effect:
  useEffect(() => {
    if (toggle) {
      setToggle(false);
      axios.get(`/api/quizzes/d/${difficulty}`)
        .then((res) => {
          const { data } = res;
          setAllDifficulty(data);
        });
    }
  }, [difficulty]);
  useEffect(() => {
    if (trigger) {
      setTrigger(false);
      axios.get(`/api/quizzes/c/${category}`)
        .then((res) => {
          const { data } = res;
          for (let i = 0; i < data.length; i += 1) {
            data[i].url = moarData[i];
          }
          setCQuizzes(data);
        });
    }
  }, [category]);

  useEffect(() => {
    const store = [];
    if (allDifficulty.length > 1) {
      for (let j = 0; j < indices.length; j += 1) {
        store.push(allDifficulty[indices[j]]);
      }
    }
    if (store.length === 4) {
      for (let i = 0; i < store.length; i += 1) {
        store[i].url = fakeData[i];
      }
      setDQuizzes(store);
    }
  }, [allDifficulty, counter]);

  // render component:
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '-100',
      position: 'relative',
    }}
    >
      <img
        src={QuizBackground}
        alt=""
        style={{
          zIndex: '-100',
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
      />
      {/* This is the Arrows for back and forward */}
      <ArrowBackIosIcon
        onClick={leftArrow}
        style={{
          position: 'absolute',
          fontSize: '100px',
          color: 'white',
          left: '10%',
          top: '52vh',
        }}
      />
      <ArrowForwardIosIcon
        onClick={rightArrow}
        style={{
          position: 'absolute',
          fontSize: '100px',
          color: 'white',
          right: '10%',
          top: '52vh',
        }}
      />
      {/* This div contains all of the image tiles */}
      <div style={{
        background: 'none',
        width: '70vw',
        height: '42em',
        position: 'absolute',
        marginTop: '5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        {/* This is for the category and difficulty Selectors */}
        <div style={{ display: 'flex', width: '28vw', justifyContent: 'space-between' }}>
          <FormControl variant="filled" sx={{ width: '15em' }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              onChange={cSelector}
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Category"
            >
              <MenuItem key="a" value="General Knowledge">General Knowledge</MenuItem>
              <MenuItem key="b" value="Animals">Animals</MenuItem>
              <MenuItem key="c" value="Geography">Geography</MenuItem>
              <MenuItem key="d" value="Entertainment: Music">Entertainment: Music</MenuItem>
              <MenuItem key="e" value="Entertainment: Film">Entertainment: Film</MenuItem>
              <MenuItem key="f" value="Science & Nature">Science & Nature</MenuItem>
              <MenuItem key="g" value="Mythology">Mythology</MenuItem>
              <MenuItem key="h" value="Entertainment: Books">Entertainment: Books</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: '15em' }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              onChange={dSelector}
              defaultValue=""
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ backgroundImage: 'linear-gradient(#FE8C59, #F56CA6)' }}
            // value={age}
              label="Difficulty"
            >
              <MenuItem key="aa" value="easy">Easy</MenuItem>
              <MenuItem key-="ab" value="medium">Medium</MenuItem>
              <MenuItem key="ac" value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* First Image Row Container */}
        <div style={{
          width: '60vw', height: '25em', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          {/* First Row Images Mapped Here:  */}
          {
            categoryQuizzes.map((ele) => (
              <div>
                <h2>{ele.title}</h2>
                <Link to={{
                  pathname: '/quizzes/quiz/',
                }}
                >
                  <img
                    onClick={pageLink}
                    key={Math.floor(Math.random() * 100)}
                    id={ele.id}
                    className="coverImages"
                    src={ele.url}
                    alt="quizImages"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                    }}
                  />
                </Link>
              </div>
            ))
          }
        </div>
        {/* Second Row Images Container */}
        {/* <div style={{ width: '70vw', border: '2px solid orange' }} /> */}
        <div style={{
          width: '60vw', height: '25em', background: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          {/* Second Row of Images Here: */}
          {
            difficultyQuizzes.map((ele) => (
              <div>
                <h2>{ele.title}</h2>
                <Link to={{
                  pathname: '/quizzes/quiz/',
                }}
                >
                  <img
                    onClick={pageLink}
                    key={Math.floor(Math.random() * 100)}
                    id={ele.id}
                    className="coverImages"
                    src={ele.url}
                    alt="quizImages"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                    }}
                  />
                </Link>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}
