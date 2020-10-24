import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import withHocs, { PropsComponent } from "./StepHoc";
import EscapedNewLineToLineBreakTag from "components/EscapedNewLineToLineBreakTag/EscapedNewLineToLineBreakTag";

/**
 * Показать шаг приготовления рецепта
 * в компоненте аккордеон
 */
const Step: React.FC<PropsComponent> = ({ step, classes, title }) => {
  const { description, cover } = step;
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading} variant="h6" component="h5">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.detail}>
        {cover && (
          <div>
            <img src={cover} alt={title} className={classes.photo} />
          </div>
        )}
        <Typography>
          <EscapedNewLineToLineBreakTag string={description} />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default withHocs(Step);
