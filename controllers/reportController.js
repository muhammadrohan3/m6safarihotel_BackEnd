import drinkSalesModel from "../models/drinkSalesModel.js";
import roomBookingModel from "../models/roomBookingModel.js";
import foodSales from "../models/foodSales.js";
import expenseModel from "../models/expenseModel.js";

function getWeekStartAndEndDates(date) {
    const today = date || new Date();
    const day = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the start date (Monday) and end date (Sunday) of the week
    const startDate = new Date(today); // Clone the current date
    startDate.setDate(today.getDate() - (day === 0 ? 6 : day - 1)); // Set to the first day (Monday) of the week

    const endDate = new Date(today); // Clone the current date
    endDate.setDate(today.getDate() + (day === 0 ? 0 : 7 - day)); // Set to the last day (Sunday) of the week

    return { startDate, endDate };
}
function getWeeksRangeOfMonth(year, month) {
    const weeksRange = [];
    const firstDayOfMonth = new Date(year, month, 2);
    const lastDayOfMonth = new Date(year, month + 1, 1);
    console.log(firstDayOfMonth, lastDayOfMonth)

    let currentWeekStart = new Date(firstDayOfMonth);
    let currentWeekEnd = new Date(firstDayOfMonth);

    // Adjust the starting day of the week. In this example, we use Sunday (0).
    const startOfWeek = 0;

    // Loop until the currentWeekEnd is after or equal to the last day of the month.
    while (currentWeekEnd < lastDayOfMonth) {
        while (currentWeekStart.getDay() !== startOfWeek) {
            // Move the start date backward until it aligns with the desired starting day of the week.
            currentWeekStart.setDate(currentWeekStart.getDate() - 1);
        }

        currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

        // Make sure the currentWeekEnd is not exceeding the last day of the month.
        if (currentWeekEnd > lastDayOfMonth) {
            currentWeekEnd = new Date(lastDayOfMonth);
        }

        weeksRange.push({
            start: new Date(currentWeekStart),
            end: new Date(currentWeekEnd),
        });

        // Move to the next week.
        currentWeekStart.setDate(currentWeekStart.getDate() + 7); // Increment by 7 to move to the next week.
    }

    // Check if the last week is a partial week (extends into the next month).
    if (currentWeekEnd.getMonth() === month) {
        currentWeekEnd = new Date(lastDayOfMonth);
        weeksRange.push({
            start: new Date(currentWeekStart),
            end: new Date(currentWeekEnd),
        });
    }

    return weeksRange;
}
const weeklyReport = async (startDate, endDate) => {
    const food = await foodSales.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } }).populate('foodItem')
    const drinks = await drinkSalesModel.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } }).populate('drinkItem')
    const rooms = await roomBookingModel.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } }).populate('room')
    let total = {
        foodTotal: 0,
        drinksTotal: 0,
        roomsTotal: 0,
    }
    food.forEach(item => {
        if (item?.total) {
            total.foodTotal += item?.total
        }

    })
    drinks.forEach(item => {
        total.drinksTotal += item.total
    })
    rooms.forEach(item => {
        total.roomsTotal += item.total
    })
    return total
}
export const reportController = {
    getDailyReport: async (req, res) => {
        const uganda_timezone = 'Africa/Kampala';
        const dateSample = new Date().toLocaleString('en-US', { timeZone: uganda_timezone });
        const date = new Date(dateSample);
        console.log("This is date", date)
        const food = await foodSales.find({ createdAt: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } }).populate('foodItem')
        const drinks = await drinkSalesModel.find({ createdAt: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } }).populate('drinkItem')
        const rooms = await roomBookingModel.find({ createdAt: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } }).populate('room')
        const expenses = await expenseModel.find({ date: { $gte: date.setHours(0, 0, 0, 0), $lt: date.setHours(23, 59, 59, 999) } })
        console.log(expenses)
        let total = {
            foodTotal: 0,
            drinksTotal: 0,
            roomsTotal: 0,
            expenseTotal: 0
        }
        food.forEach(item => {
            total.foodTotal += item.total
        })
        drinks.forEach(item => {
            total.drinksTotal += item.total
        })
        rooms.forEach(item => {
            total.roomsTotal += item.total
        })
        expenses.forEach(item => {
            total.expenseTotal += item.amount
        })
        res.status(200).send({ msg: "Daily Report Found", total })
    },
    getWeeklyReport: async (req, res) => {
        const { startDate, endDate } = getWeekStartAndEndDates();
        const food = await foodSales.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } })
        const drinks = await drinkSalesModel.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } })
        const rooms = await roomBookingModel.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } })
        const expenses = await expenseModel.find({ createdAt: { $gte: startDate.setHours(0, 0, 0, 0), $lt: endDate.setHours(23, 59, 59, 999) } })
        let total = {
            foodTotal: 0,
            drinksTotal: 0,
            roomsTotal: 0,
            expenseTotal: 0
        }
        food.forEach(item => {
            if (item?.total) {
                total.foodTotal += item?.total
            }
        })
        drinks.forEach(item => {
            total.drinksTotal += item.total
        })
        rooms.forEach(item => {
            total.roomsTotal += item.total
        })
        expenses.forEach(item => {
            total.expenseTotal += item.amount
        })
        res.status(200).send({ msg: "Weekly Report Found", total })
    },
    getMonthlyReport: async (req, res) => {
        const date = new Date()
        const food = await foodSales.find({ createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0) } }).populate('foodItem')
        const drinks = await drinkSalesModel.find({ createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0) } }).populate('drinkItem')
        const rooms = await roomBookingModel.find({ createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0) } }).populate('room')
        const expense = await expenseModel.find({ createdAt: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0) } })
        let total = {
            foodTotal: 0,
            drinksTotal: 0,
            roomsTotal: 0,
            expenseTotal: 0
        }
        food.forEach(item => {
            if (item?.total) {
                total.foodTotal += item?.total
            }
        })
        drinks.forEach(item => {
            total.drinksTotal += item.total
        })
        rooms.forEach(item => {
            total.roomsTotal += item.total
        })
        expense.forEach(item => {
            total.expenseTotal += item.amount
        })
        res.status(200).send({ msg: "Monthly Report Found", total })
    },
    getMonthlyDetailedReport: async (req, res) => {
        const date = new Date();
        const total = [];
        const weekRange = getWeeksRangeOfMonth(date.getFullYear(), date.getMonth());
        async function fetchWeeklyData() {
            for (const week of weekRange) {
                const weekly = await weeklyReport(week.start, week.end);
                total.push(weekly);
            }
            res.status(200).send({ msg: "Monthly Detailed Report Found", total });
        }
        fetchWeeklyData();

    }
}
