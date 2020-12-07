import React from "react";
import { Dialog, Button,DialogActions } from "@material-ui/core";
const AgencyDetailDialog = ({
  open,
  onConfirmDialogClose,
  detail,
  cancel,
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div className="pt-24 px-20 pb-8">
        {detail}
        <DialogActions>
            <div className="flex flex-space-between flex-middle">  
              <Button
                variant="contained"
                color="secondary"
                onClick={onConfirmDialogClose}
              >
                {cancel}
              </Button>
            </div>
          </DialogActions>

      </div>
    </Dialog>
  );
};

export default AgencyDetailDialog;
