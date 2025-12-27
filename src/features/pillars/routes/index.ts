export const ENDPOINTS_DAILY_TASK = {

      TODAY: "daily-content/today",
      DAY_CHOOSE: (day_number: string)=> `daily-content/day/${day_number}`,
      VALIDATE: (day_number: string)=> `daily-content/day/${day_number}/validate`,
}


export const ENDPOINTS_JOURNEY = {

      JOURNEY_USER: "journey/my-journey",

      JOURNEY_STRUCTURE: "journey/structure",

      CREATE_JOURNEY: "journey",  //Administrateur
      CREATE_PILLARS: (id: number) => `journey/${id}/pillars`,  //Administrateur
      CREATE_DAILY_TASK: (id: number) => `journey/${id}/daily-content`,  //Administrateur

      ASSIGN_JOURNEY: (id: number) => `journey/${id}/assign`,  //Administrateur
      VALIDATE_JOURNEY: `journey/validate-daily`,  
      MORE_FORWARD: `journey/advance`,
      WEEKLY_EVALUATION: `journey/weekly-evaluation`,
      
}