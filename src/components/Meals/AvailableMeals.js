import React, { useEffect, useState } from "react"

import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card"
import MealItem from "./MealItem/MealItem"

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchmeals = async () => {
      const response = await fetch(
        "https://learning-react-da5a3-default-rtdb.firebaseio.com/meals.json"
      )

      // if (!response.ok) {
      //   throw new Error("Something went wrong!")
      // }

      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchmeals().catch((err) => {
      setIsLoading(false)
      setHttpError(err.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals