
/* MAIN */

const attempt = <T, U> ( fn: () => T, fallback: U ): T | U => {

  try {

    return fn ();

  } catch {

    return fallback;

  }

};

/* EXPORT */

export {attempt};
