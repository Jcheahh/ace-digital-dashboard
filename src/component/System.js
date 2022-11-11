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
import "./System.css";

export default function System() {
  const initialFilter = {
    brand: [],
    fuel_type: [],
    aspiration: [],
    num_of_doors: [],
    body_style: [],
    drive_wheels: [],
  };

  const [cars, setCars] = useState([]);
  const [toFilters, setToFilters] = useState(initialFilter);

  const animatedComponents = makeAnimated();

  const fetchCars = () => {
    http.get(`/api/cars`).then((body) => {
      setCars(body.data);
    });
  };

  const reducedCar = Object.entries(
    cars.reduce((state, car) => {
      if (state[car.brand]) {
        state[car.brand]++;
      } else {
        state[car.brand] = 1;
      }
      return state;
    }, {})
  );

  useEffect(() => {
    fetchCars();
  }, []);

  const barState = {
    labels: reducedCar.map(([brand, _]) => brand),
    datasets: [
      {
        label: "Car Sold Amount",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: reducedCar.map(([_, amount]) => amount),
      },
    ],
  };
  const lineState = {
    labels: reducedCar.map(([brand, _]) => brand),
    datasets: [
      {
        label: "Car Sold Amount",
        lineTension: 0.5,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: reducedCar.map(([_, amount]) => amount),
      },
    ],
  };
  const pieState = {
    labels: reducedCar.map(([brand, _]) => brand),
    datasets: [
      {
        label: "Car Sold Amount",
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
        borderColor: "rgba(0,0,0,1)",

        borderWidth: 2,
        data: reducedCar.map(([_, amount]) => amount),
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
      <div className="flex flex-row">
        <aside className="w-64" aria-label="Sidebar">
          <div className="overflow-y-auto py-6 px-5 bg-gray-50 rounded h-full">
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
            <div className="pt-2">
              <button type="button" className="pl-5" onClick={reset}>
                Reset
              </button>
              <button type="button" className="pl-5" onClick={applyFilter}>
                Apply
              </button>
            </div>
          </div>
        </aside>

        <div className="pl-5">
          <div className="space-y-8 md:space-y-0 md:space-x-8 lg:flex xl:items-center">
            <div>
              <p className="chart">
                <Bar
                  data={barState}
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
            <div>
              <p className="chart">
                <Line
                  data={lineState}
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
            <div>
              <p className="chart">
                <Pie
                  data={pieState}
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
          </div>
          <div className="pt-8">
            <table>
              <thead>
                <tr>
                  <th className="pr-8">Car Sold Brand</th>
                  <th>Total</th>
                </tr>
              </thead>
              {reducedCar.map(([brand, amount]) => (
                <tbody>
                  <tr>
                    <td>{brand}</td>
                    <td>{amount}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
