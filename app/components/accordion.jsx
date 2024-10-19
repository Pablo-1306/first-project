"use client"
import { Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import { theme } from "../styles/global-theme";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComp({title, body}) {

  return (
    <Accordion sx={{backgroundColor: theme.palette.lighter.main}}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        >
        {title}
        </AccordionSummary>
        <AccordionDetails>
            {body}
        </AccordionDetails>
    </Accordion>
  )
}