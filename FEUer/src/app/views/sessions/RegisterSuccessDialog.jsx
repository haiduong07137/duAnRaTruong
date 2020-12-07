import React, { Component } from "react";

import {
  Button,
  Dialog,
  Grid
} from "@material-ui/core";

class RegisterSuccessDialog extends Component {
  handleGoToVerify = () => {
    // window.open("http://gmail.com", "_blank")
    this.props.handleClose()
  }

  // handleGoToSignInPage = () => {
  //   this.props.handleClose()
  // }
  render() {
    let { open, handleClose } = this.props;

    return (
      <Dialog open={open} maxWidth="sm" fullWidth={false}>
        <div className="success-register-dialog">
          <img 
            className="img-success"
            alt="svgImg" 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDIyNiAyMjYiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMjI2di0yMjZoMjI2djIyNnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjNzQ2N2VmIj48cGF0aCBkPSJNMTEzLDkuMDRjLTU3LjMyMjY0LDAgLTEwMy45Niw0Ni42MzczNiAtMTAzLjk2LDEwMy45NmMwLDU3LjMyNzE2IDQ2LjYzNzM2LDEwMy45NiAxMDMuOTYsMTAzLjk2YzU3LjMyNzE2LDAgMTAzLjk2LC00Ni42MzI4NCAxMDMuOTYsLTEwMy45NmMwLC01Ny4zMjI2NCAtNDYuNjMyODQsLTEwMy45NiAtMTAzLjk2LC0xMDMuOTZ6TTE2MS45MzgwNCw3NC44NjAyNGwtNTIuMDI5NzIsNzYuNjcyNzZsLTQwLjY2NjQ0LC0zNy43Mzc0OGMtMS44MzA2LC0xLjY5NSAtMS45MzkwOCwtNC41NTYxNiAtMC4yMzk1NiwtNi4zODY3NmMxLjY5NSwtMS44MzUxMiA0LjU2MDY4LC0xLjkzNDU2IDYuMzg2NzYsLTAuMjM5NTZsMzIuOTUwOCwzMC41NzMyOGw0Ni4xMTc1NiwtNjcuOTYyNzJjMS40MDU3MiwtMi4wNjU2NCA0LjIxNzE2LC0yLjU5OSA2LjI3ODI4LC0xLjIwMjMyYzIuMDcwMTYsMS40MDEyIDIuNjA4MDQsNC4yMTI2NCAxLjIwMjMyLDYuMjgyOHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
          />
          <section className="alignCenter">
            <h6 className="fs-24">
              Registration Successful
            </h6>
            <p className="fs-16">
              Please help us secure your account by verifying your email address.
            </p>
            <Grid 
              container
              justify="center"
              alignItems="center"
              spacing={6}
            >
              {/* <Grid item xs={6}>
                <Button 
                  variant="contained"
                  color="primary"
                  className="MuiGrid-spacing-xs-1" 
                  onClick={this.handleGoToSignInPage}
                >
                  <Grid item xs={3}>
                    <img 
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACD0lEQVRIie1TP4sTQRx9s7dFkNtAQDBEC0kQDFbOb0KKbZIiYh9PbRW88mwEP4BVCsHmbA4sLA4lCn4BS5WFmdVGuTKCsC4XiLARB0nmZ3NCLixJ7jwrfbDNvH/7hl3gCFBKhUqp8CietRV1gojuAegB6FYqFT9JkncrGZcJwjAMrLVPAJz2ff8mAEwmk2cAhoVC4Xaapj9LpdJZAPA873sURems31sULqWsW2sjAIMgCDpRFKVRFKVBEHQADKy1UbFY3HDOfXTOvZlOp49XXkBEGwAeCSHuaq1f5GmUUteYeYeZPwF44HneHa11d2FBq9XysyzrAbgKoGuM2Vu0koguAngphBgCGM4XHLqiRqNRHo/HrwGcs9Y2l4UDgDFmz1rbZOavzFxvNptncoVKqZCIPhPR/bxlq0BKuUlEX4io/ftsDQCIaAvAjnPuehzHu8cJB4AkSUy5XNZCiFeVSuVHkiSRkFLeEkJsASgZY84fN3wWRDQAMGLmh16tVnvqnLtyEsFz6MRxvOv1+/2p53n8FwoAwPnLFEqpy8x8I48TQjzXWr9f5F/4JwOAc+4SgDaA0dzTPuAWYumCgzf9oLXuzZ4pparMy2926YI/xf+Cf6Bg9jNdl1Ju5miazHxhnmPmOgBfSnkqx7N+qCAIgm9Zlm0LIao54n0A+zncWyEEAOR5tqvV6sgYk0OdMH4BlcTMzlPsZCcAAAAASUVORK5CYII="
                    />
                  </Grid>
                  <Grid item xs={9}>
                    Go to sign in
                  </Grid>
                </Button>
              </Grid> */}

              <Grid item xs={6}>
                <Button 
                  variant="contained"
                  color="primary"
                  className="MuiGrid-spacing-xs-1" 
                  onClick={this.handleGoToVerify}
                >
                  <Grid item xs={3}>
                    <img 
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACqElEQVRIie2Vz0tUURTHP/e+++bpe9pgWfYDDAsKsozKmlyJi7QIWkhFktEiRIoWQT+kNonUvxC06hcWFUWrkAiNINMgK60gC0UjyR8NoTnTzJv3XovRMXXMsdrVWV3O5Xy+X+45hwv/Y5YQAF5Tk+rzZ54Ti5cu+BtQOdg/kBP8elaUlMQUwMCTx2H16qXyVezHV7odhPg9sucRfdBA9EY9g+s3nAR8CsB73aGIRolcuUSs7Tnp1UcQ8+fPjR0MEr54AaejnTGmDiABwgtzELoOgNPRzmjNCeyW5pThdkszozUnEnCh64SzF8XPAM8CAc/KzSU7Owuv71OiUN9ahHGoCmFlJCeHw3yvv4bd+DCRkouX8GX4GyNd3WxpbRVy/GK0t5fBlaugbEeiB3bLU0KnT+G8fTON7XS+Y/RMzQRcCGRxCcHVaxjp6p4Q/LlIACPbyogePorIygLAHRoidL6OyNXLeLYNTozInduE6s7i9n+O183z4x05Sqh8N47rTjKipjpTSvE9bwXRY8fJvHcX70VbfDoa7hN78zou+rF3wuHGTUT27sNJN5O+4jQBIQS6rhNNN/laUUnG2gK0WzcgEpkEFj4fonwPoa1FvxzraQI/i9i2zbd1Bei5y7FuXsf78D7uOm8F0QMHiS3InhH8SwEAKSWapuE4Drbfz3BVNZmPGpFSEindjkNqyzijAMT74XkeruuCprB37sJxnJTAKQkA6GMLKISYMxymjGmyMAyDjIwZFu1PBKSUWJaFYRhIKTHN5GOYmoCa/FJKKSzLQtO0RE7TNAzDSJ08xpQAvvz8zvF8Wloapmkiksy2YRgoNWvbADCLi10Y/3Bqa+VbKfelFRTkmIGAPkutZdv25pkuYz09phsM9q9ctqxSFBbaKbn5t+MHKwXfIwcmI0wAAAAASUVORK5CYII="
                    />
                  </Grid>
                  <Grid item xs={9}>
                    Go to verify account
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </section>
        </div>
      </Dialog>
    );
  }
}

export default RegisterSuccessDialog;
