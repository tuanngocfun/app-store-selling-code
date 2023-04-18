import './categories.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import cal from '../../images/characters/cal-cropped.png';
import rocket from '../../images/characters/rocket-cropped.png';
import joel from '../../images/characters/joel-cropped.png';
import dante from '../../images/characters/dante-cropped.png';
import chief from '../../images/characters/master-chief.png';
import tekken from '../../images/characters/tekken-cropped.png';
import geralt from '../../images/characters/geralt-cropped.png';
import sonic from '../../images/characters/sonic.png';
import messi from '../../images/characters/messi.png';

import sport from '../../images/covers/fifa-sport.webp';
import action from '../../images/covers/avangers-strategy.jpg';
import survival from '../../images/covers/days-gone-survival.jpg';
import single from '../../images/covers/spiderman-single.jpg';
import rpg from '../../images/covers/elden-ring-rpg.jpg';
import arcade from '../../images/covers/tmnt-arcade.jpg';
import fighting from '../../images/covers/Street-Fighter-Fighting.jpg';
import fps from '../../images/covers/battlefield-v-fps.jpg';
import adventure from '../../images/covers/uncharted-adv3.jpg';

function Categories() {
  return (
    <div className="categories-inner-container">
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Action</h1>
          <img
            src={action}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={cal}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Single-player</h1>
          <img
            src={single}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={rocket}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Adventure</h1>
          <img
            src={adventure}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={dante}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Survival</h1>
          <img
            src={survival}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={joel}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>First person shooter</h1>
          <img
            src={fps}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={chief}
            id="chief"
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Fighting</h1>
          <img
            src={fighting}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={tekken}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Role-playing</h1>
          <img
            src={rpg}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={geralt}
            className="character-image"
            id="geralt"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>

      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Sports</h1>
          <img
            src={sport}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={messi}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>

      <Link className="categories-item-container">
        <div className="categories-item-content">
          <h1>Arcade</h1>
          <img
            src={arcade}
            className="categories-cover"
            alt=""
            loading="lazy"
          ></img>
        </div>
        <div className="characters">
          <img
            src={sonic}
            className="character-image"
            alt=""
            loading="lazy"
          ></img>
        </div>
      </Link>
    </div>
  );
}

export default Categories;
