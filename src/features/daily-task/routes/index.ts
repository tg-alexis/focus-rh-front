export const endpoints_daily_task = {

      today: "daily-content/today",
      day_choose: (day_number: string)=> `daily-content/day/${day_number}`,
      validate: (day_number: string)=> `daily-content/day/${day_number}/validate`,
}


export const endpoints_journey = {

      journey_user: "/api/v1/journey/my-journey",

      create_journey: "/api/v1/journey",  //Administrateur
      create_pillars_for_journey: (id: number) => `api/v1/journey/${id}/pillars`,  //Administrateur
      create_daily_task_for_journey: (id: number) => `api/v1/journey/${id}/daily-content`,  //Administrateur

      assign_journey_to_user: (id: number) => `api/v1/journey/${id}/assign`,  //Administrateur
      validate_journey: `api/v1/journey/validate-daily`,  
      more_forward: `api/v1/journey/advance`,
      weekly_evaluation: `api/v1/journey/weekly-evaluation`,
      
}