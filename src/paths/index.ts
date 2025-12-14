const ROOTS = {
    AUTH: '/auth',
    ADMINISTRATEUR: '/admin',
    SETTINGS: '/admin/parametre',
}


export const paths = {
      //Authentication
      auth: {
            root: ROOTS.AUTH,
            login: `${ROOTS.AUTH}`,
            forgetPasseword: `${ROOTS.AUTH}/forget-password`,
            resetPassword: `${ROOTS.AUTH}/reset-password`
      },

      //Core of the application
      core: {
            dashboard: '/dashboard',
            pillars: '/pillars',
            dailyTask: '/daily-task',
      }
}