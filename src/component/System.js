import React, { useState, useEffect } from "react";
import http from "../http";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  brandOptions,
  fuelTypeOptions,
  aspirationOptions,
  numberOfDoorsOptions,
  bodyStyleOptions,
  driveWheelsOptions,
} from "./docs/data";
import { Pie, Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function System() {
  const initialFilter = {
    brand: [],
    fuel_type: [],
    aspiration: [],
    num_of_doors: [],
    body_style: [],
    drive_wheels: [],
  };

  const sstate = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const ssstate = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const [cars, setCars] = useState([]);
  const [toFilters, setToFilters] = useState(initialFilter);

  const animatedComponents = makeAnimated();
  const fetchCars = () => {
    http.get(`/api/cars`).then((body) => {
      setCars(body.data);
    });
  };

  useEffect(() => {
    console.log(xxx[0]);
    fetchCars();
  }, []);

  const xxx = Object.entries(
    cars.reduce((state, car) => {
      if (state[car.brand]) {
        state[car.brand]++;
      } else {
        state[car.brand] = 1;
      }
      return state;
    }, {})
  ).sort(([_, a], [__, b]) => b - a);

  const state = {
    labels: ["Toyota", "Nissan", "Mercedes-Benz", "Bmw", "Honda"],
    datasets: [
      {
        label: "Car Brand",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  const filter = (field, param) => {
    setToFilters({ ...toFilters, [field]: param });
  };
  const reset = () => {
    setToFilters(initialFilter);
    fetchCars();
  };

  const applyFilter = () => {
    http
      .get(`/api/cars/filter`, {
        params: Object.fromEntries(
          Object.entries(toFilters).map(([field, filters]) => [
            field,
            filters.map((f) => f.value),
          ])
        ),
      })
      .then((body) => {
        setCars(body.data);
      });
  };
  return (
    <>
      <div>
        <div>
          <span>Brand</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[brandOptions[0]]}
            isMulti
            options={brandOptions}
            onChange={(choice) => filter("brand", choice)}
            value={toFilters.brand}
          />
          <span>Fuel Type</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={fuelTypeOptions}
            onChange={(choice) => filter("fuel_type", choice)}
            value={toFilters.fuel_type}
          />
          <span>Aspiration</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={aspirationOptions}
            onChange={(choice) => filter("aspiration", choice)}
            value={toFilters.aspiration}
          />
          <span>Number of doors</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={numberOfDoorsOptions}
            onChange={(choice) => filter("num_of_doors", choice)}
            value={toFilters.num_of_doors}
          />
          <span>Body style</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={bodyStyleOptions}
            onChange={(choice) => filter("body_style", choice)}
            value={toFilters.body_style}
          />
          <span>Drive Wheels</span>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={driveWheelsOptions}
            onChange={(choice) => filter("drive_wheels", choice)}
            value={toFilters.drive_wheels}
          />
        </div>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={applyFilter}>
          Apply
        </button>
      </div>
      <div>
        <h1>
          <span>Dashboard</span>
          <span>Project</span>
        </h1>
        <p style={{ width: 700 }}>
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
          <Line
            data={sstate}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
          <Pie
            data={ssstate}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </p>
      </div>
    </>
  );
}
