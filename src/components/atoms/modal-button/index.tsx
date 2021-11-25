import { useState } from 'react'

import { Button, Modal, Box } from '@mui/material'

import tw, { combine } from '@tailwind'

import type { ModalButtonComponent } from './types'

const ModalButton: ModalButtonComponent = ({
    children,
    className = '',
    modalClassName = tw`max-w-sm`,
    button
}) => {
    const [open, updateModal] = useState(false)

    const handleOpen = () => {
        updateModal(true)
    }

    const handleClose = () => {
        updateModal(false)
    }

    return (
        <>
            <Button
                className={className}
                onClick={handleOpen}
                variant="contained"
                disableElevation
            >
                {button}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className={tw`flex justify-center items-center px-4`}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className={combine(
                        tw`absolute flex flex-col bg-white p-4 rounded`,
                        modalClassName
                    )}
                    sx={{
                        width: 'calc(100% - 24px) !important'
                    }}
                >
                    {children}
                </Box>
            </Modal>
        </>
    )
}

export default ModalButton
