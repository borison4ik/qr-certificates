import { useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { Menu, MenuItem, IconButton, Divider, ListItemIcon, ListItemText } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { ICertificate } from '@/models/certificate/ICertificate';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';
import { PAGES_URL } from '@/config/pages-url.config';
import { useUpdateCertificate } from '@/hooks/queries';
import { copyImageToClipboard } from 'copy-image-clipboard';
import { useSnackbar } from 'notistack';

interface IActionButtonProps {
  certificate: ICertificate;
  setSpendModalOpen: (open: boolean) => void;
}

const ActionButton: FC<IActionButtonProps> = ({ certificate, setSpendModalOpen }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { mutate } = useUpdateCertificate(certificate.id);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const editHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    navigate(`/${PAGES_URL.CERTIFICATE}/${certificate.id}`);
  };
  const handleDeactivate = async () => {
    handleClose();
    setTimeout(() => {
      mutate({ data: { ...certificate, isActivated: false } });
    }, 300);
  };

  const handleActivate = async () => {
    handleClose();
    setTimeout(() => {
      mutate({ data: { ...certificate, isActivated: true } });
    }, 300);
  };

  const handleUpdate = async () => {
    navigate(`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATE_UPDATE}/${certificate.id}`);
  };

  const handlSpend = async () => {
    setSpendModalOpen(true);
    handleClose();
  };

  function copyQrHandler() {
    copyImageToClipboard(`http://localhost:4200/static/images/qr/${certificate.id}.png`)
      .then(() => {
        enqueueSnackbar('QR код скопирован', { variant: 'success', autoHideDuration: 1000 });
      })
      .catch((e) => {
        console.log('Error: ', e.message);
        enqueueSnackbar('Ошибка копирования QR', { variant: 'error', autoHideDuration: 1000 });
      });
    handleClose();
  }

  const copyLinkHandler = async () => {
    if (!window || !window.navigator || !window.navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(`${import.meta.env.VITE_LOCAL_URL}/${PAGES_URL.CERTIFICATE}/${certificate.id}`);
      enqueueSnackbar('Ссылка скопирована', { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('Error: ', error);
      enqueueSnackbar('Ошибка копирования ссылки', { variant: 'error', autoHideDuration: 1000 });
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton id='basic-button' aria-controls={open ? 'basic-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={editHandleClick}>
        <MenuIcon />
      </IconButton>

      {certificate.isActivated ? (
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          <MenuItem onClick={copyQrHandler}>
            <ListItemIcon>
              <QrCodeIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Скопировать QR</ListItemText>
          </MenuItem>
          <MenuItem onClick={copyLinkHandler}>
            <ListItemIcon>
              <LinkIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Скопировать ссылку</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <RemoveRedEyeIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Посмотреть</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleUpdate}>
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Изменить</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handlSpend}>
            <ListItemIcon>
              <CurrencyExchangeIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Потратить</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDeactivate} sx={{ color: 'red' }}>
            <ListItemIcon>
              <DoDisturbIcon fontSize='small' color='warning' />
            </ListItemIcon>
            <ListItemText>Отключить</ListItemText>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}>
          {certificate.totalPrice - certificate.spendPrice > 0 ? (
            <MenuItem onClick={handleActivate} sx={{ color: 'green' }}>
              <ListItemIcon>
                <CheckCircleOutlineIcon fontSize='small' color='success' />
              </ListItemIcon>
              <ListItemText>Активировать</ListItemText>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleUpdate}>
              <ListItemIcon>
                <EditIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Изменить</ListItemText>
            </MenuItem>
          )}
        </Menu>
      )}
    </>
  );
};

export { ActionButton };
