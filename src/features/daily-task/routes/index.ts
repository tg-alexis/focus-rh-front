export const ENDPOINTS_DAILY_TASK = {

      TODAY: "daily-content/today",
      DAY_CHOOSE: (day_number: string)=> `daily-content/day/${day_number}/`,
      VALIDATE: (day_number: string)=> `daily-content/day/${day_number}/validate/`,
}


export const ENDPOINTS_JOURNEY = {

      JOURNEY_USER: "/api/v1/journey/my-journey/",

      CREATE_JOURNEY: "/api/v1/journey/",  //Administrateur
      CREATE_PILLARS: (id: number) => `api/v1/journey/${id}/pillars/`,  //Administrateur
      CREATE_DAILY_TASK: (id: number) => `api/v1/journey/${id}/daily-content/`,  //Administrateur

      ASSIGN_JOURNEY: (id: number) => `api/v1/journey/${id}/assign/`,  //Administrateur
      VALIDATE_JOURNEY: `api/v1/journey/validate-daily/`,  
      MORE_FORWARD: `api/v1/journey/advance/`,
      WEEKLY_EVALUATION: `api/v1/journey/weekly-evaluation/`,
      
}