import React from "react";
import Typography from "@material-ui/core/Typography";

/**
 * Название приложения
 */
const AppName: React.FC = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Кулинарная книга
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Учебный демонстрационный проект, использующий MongoDB, GraphQL, MobX.
      </Typography>
    </>
  );
};

export default AppName;
