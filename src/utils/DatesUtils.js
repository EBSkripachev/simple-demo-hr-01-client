export default class DatesUtils {
    static getMonthMap = (year, month) => {
        const endDate = new Date(year, month + 1, 0)
        let map = []
        let week = []

        for (let i = 1; i <= endDate.getDate(); i++) {
            let date = new Date(year, month, i)
            let day = date.getDay()
            if (day === 0) {
                day = 7
            } 
        
            if (day !== 1 && week.length === 0) {
                for(let i = 1; i < day; i++) {
                    week.push(0)
                }
            } else if (day === 1) {
                week = []
            } 

            week.push(date.getDate())

            if (date.getDate() === endDate.getDate()) {
                for(let i = 0; i <= 6 - day; i++) {
                    week.push(0)
                }
                map.push(week)
            } else if (day === 7) {
                map.push(week)
            }

        }

        return map
    }

    static getMonthMapDates = (year, month) => {
        const endDate = new Date(year, month + 1, 0)
        let map = []
        let week = []

        for (let i = 1; i <= endDate.getDate(); i++) {
            let date = new Date(year, month, i)
            let day = date.getDay()
            if (day === 0) {
                day = 7
            } 
        
            if (day !== 1 && week.length === 0) {
                for(let i = 1; i < day; i++) {
                    week.push(null)
                }
            } else if (day === 1) {
                week = []
            } 

            week.push(date)

            if (date.getDate() === endDate.getDate()) {
                for(let i = 0; i <= 6 - day; i++) {
                    week.push(null)
                }
                map.push(week)
            } else if (day === 7) {
                map.push(week)
            }

        }

        return map
    }

    static toString (date) {
        if (!date) return ''

        let year = date.getFullYear()
        let month = date.getMonth() + 1 + ''
        let day = '' + date.getDate()

        if (!year) return ''

        if (month.length < 2) {
            month = '0' + month
        }
            
        if (day.length < 2) {
            day = '0' + day
        }
            

        return [year, month, day].join('-')
    }

    static getCurrentWeek = (year, month) => {
        const date = new Date(Date.now())
        if (date.getFullYear() === year && date.getMonth() === month) {
            return Math.ceil(new Date().getDate() / 7) - 1
        }
        return null
    }

    static compareDates = (d1, d2) => {
        const date1 = new Date(Date.parse(d1))
        const date2 = new Date(Date.parse(d2))
    
        if (date1 && date2 &&
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() && 
            date1.getDate() === date2.getDate()) {
            return true
        }
        return false
    }

    static getWeekIndex = (map, date) => {
        const weekIndex = map.findIndex(week => {
            const dayIndex = week.findIndex(day => {
                if (day && date &&
                        day.getFullYear() === date.getFullYear() && 
                        day.getMonth() === date.getMonth() && 
                        day.getDate() === date.getDate()) {
                        return true
                } else {
                    return false
                }
            })

            if (dayIndex !== -1) {
                return true
            } else {
                return false
            }
        })

        if (weekIndex !== -1) {
            return weekIndex
        } else {
            return null
        }
    }

}