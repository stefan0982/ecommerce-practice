import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'iphone 6',
    imgPath:
        'https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    label: 'iphone',
    imgPath:
        'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
  {
    label: 'one plus',
    imgPath:
        'https://images.pexels.com/photos/63690/pexels-photo-63690.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  },
  {
    label: 'samsung',
    imgPath:
        'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

function ProductCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
      <Box sx={{ maxWidth: '80vh', flexGrow: 1 }}>
        <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
          {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                        component="img"
                        sx={{
                          height: 400,
                          display: 'block',
                          maxWidth: '80vh',
                          overflow: 'hidden',
                          width: '100%',
                        }}
                        src={step.imgPath}
                        alt={step.label}
                    />
                ) : null}
              </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
        />
      </Box>
  );
}

export default ProductCarousel;
