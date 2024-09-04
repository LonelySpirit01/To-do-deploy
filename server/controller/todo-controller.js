import Stripe from "stripe";
import Todo from "../model/Todo.js";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const addTodo = async (request, response) => {
  try {
    const newTodo = await Todo.create({
      data: request.body.data,
      createdAt: Date.now(),
    });

    await newTodo.save();

    return response.status(200).json(newTodo);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllTodos = async (request, response) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    return response.status(200).json(todos);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const toggleTodoDone = async (request, response) => {
  try {
    const todoRef = await Todo.findById(request.params.id);

    const todo = await Todo.findOneAndUpdate(
      { _id: request.params.id },
      { done: !todoRef.done }
    );

    await todo.save();

    return response.status(200).json(todo);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateTodo = async (request, response) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: request.params.id },
      { data: request.body.data }
    );

    const todo = await Todo.findById(request.params.id);

    return response.status(200).json(todo);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteTodo = async (request, response) => {
  try {
    const todo = await Todo.findByIdAndDelete(request.params.id);

    return response.status(200).json(todo);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

//Payment
export const payment = async (req, res) => {
  try {
    var session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Subscription Service", // Description of the product or service
            },
            unit_amount: 50000,
            recurring: {
              interval: "month", // Interval of the subscription (e.g., 'month' or 'year')
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/sucess",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: "demo@gmail.com",
    });
    res.json(session);
  } catch (err) {
    console.log("Error while doing payment", err.message);
  }
};
