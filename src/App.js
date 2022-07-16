import "./App.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function App() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#1954ad",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: "#5ab782",
    },
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const [versions, setVersions] = useState([
    {
      name: "Version 1.1.0",
      progress: 0,
      start_date: new Date(),
      release_date: new Date(),
      description: "desc1",
    },
    {
      name: "Version 2.1.0",
      progress: 10,
      start_date: new Date(),
      release_date: new Date(),
      description: "desc2",
    },
  ]);
  const [startDate, setStartDate] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currName, setCurrName] = useState(null);
  const [currVersion, setCurrentVersion] = useState(null);
  const [version, setVersion] = useState({
    name: "",
    start_date: startDate,
    release_date: releaseDate,
    description: "",
  });

  const { name, description } = version;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMsg, setmodalMsg] = React.useState("");

  const handleOpenModal = (msg) => {
    setModalOpen(true);
    setmodalMsg(msg);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setmodalMsg("");
  };

  const onChangeVersion = (e) => {
    setVersion({ ...version, [e.target.name]: e.target.value });
  };

  const addRelease = (newVersion) => {
    const found = versions.some((ver) => ver.name === newVersion.name);
    if(found){
      handleOpenModal('A Release with similar version already exists. Please enter a unique name')
    }
    else{
      setVersions([...versions, newVersion]);
    }
  };

  const updateRelease = (newVersion) => {
    setVersions(
      versions.map((version) => {
        return version.name === currVersion.name ? newVersion : version;
      })
    );
  };

  const onSubmit = () => {
    if (name === "" || startDate === null || releaseDate === null) {
      handleOpenModal("Please Enter all the Details");
    } else if (startDate > releaseDate) {
      handleOpenModal("START DATE Should be less than the RELEASE DATE");
    } else {
      const newVersion = {
        name: name,
        start_date: startDate,
        release_date: releaseDate,
        description: description,
      };
      if (currVersion === null) {
        addRelease(newVersion);
      } else {
        updateRelease(newVersion);
      }
      setVersion({
        name: "",
        start_date: null,
        release_date: null,
        description: "",
      });
      setStartDate(null);
      setReleaseDate(null);
    }
  };

  const setCurrentVersionName = (event, name) => {
    setCurrName(name);
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleDelete = (name) => {
    setVersions(versions.filter((version) => version.name !== name));
  };

  useEffect(() => {
    if (currVersion !== null) {
      setVersion(currVersion);
      setStartDate(currVersion.start_date);
      setReleaseDate(currVersion.release_date);
    } else {
      setVersion({
        name: "",
        start_date: null,
        release_date: null,
        description: "",
      });
      setStartDate(null);
      setReleaseDate(null);
    }
  }, [currVersion]);

  return (
    <div className="App">
      <div className="heading-container">
        <h4 className="heading">Releases</h4>
      </div>
      <TableContainer component={Paper} style={{ 
        boxShadow: "none", 
        marginTop:"1rem", 
        padding:"5px", 
        width:"99%" 
        }}>
        <Table
          sx={{ minWidth: 650, marginBottom: "100px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow style={{ color: "#a4aab3" }}>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
                style={{ width: "10px" }}
              ></TableCell>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Version
              </TableCell>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Status
              </TableCell>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Progress
              </TableCell>
              <TableCell
                align="center"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Start Date
              </TableCell>
              <TableCell
                align="center"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Release Date
              </TableCell>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Description
              </TableCell>
              <TableCell
                align="left"
                className="light-grey pd-8 bld ls1 bott-shadow font-11"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {versions.length > 0 &&
              versions.map((version) => (
                <>
                  <TableRow
                    key={version.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="no-border">
                      <div
                        style={{ textAlign: "center" }}
                        className="dot-container"
                      >
                        <span className="dot dot-2"></span>
                        <span className="dot dot-3"></span>
                        <span className="dot dot-1"></span>
                        <span className="dot dot-4"></span>
                        <span className="dot dot-5"></span>
                        <span className="dot dot-6"></span>
                        <span className="dot dot-7"></span>
                        <span className="dot dot-8"></span>
                      </div>
                    </TableCell>
                    <TableCell align="left" className="content no-border">
                      {version.name}
                    </TableCell>
                    <TableCell align="left" className="uppercase no-border">
                      {((new Date().getTime() - version.start_date?.getTime()) /
                        (version.release_date?.getTime() -
                          version.start_date?.getTime())) *
                        100 <=
                      0 ? (
                        <span
                          sx={{ fontWeight: 900 }}
                          className="status in-progress"
                        >
                          In Progress
                        </span>
                      ) : ((new Date().getTime() -
                          version.start_date?.getTime()) /
                          (version.release_date?.getTime() -
                            version.start_date?.getTime())) *
                          100 <=
                        99 ? (
                        <span className="status unreleased">Unreleased</span>
                      ) : (
                        <span className="status released">Released</span>
                      )}
                    </TableCell>
                    <TableCell align="left" className="no-border">
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          version.start_date > new Date()
                            ? 0
                            : Math.round(
                                ((new Date().getTime() -
                                  version.start_date?.getTime()) /
                                  (version.release_date?.getTime() -
                                    version.start_date?.getTime())) *
                                  100
                              )
                        }
                      />
                    </TableCell>
                    <TableCell align="center" className="content no-border">
                      {(version.start_date.getDate() >= 10
                        ? version.start_date.getDate()
                        : "0" + version.start_date.getDate()) +
                        "/" +
                        (version.start_date.getMonth() + 1 >= 10
                          ? version.start_date.getMonth() + 1
                          : "0" + (version.start_date.getMonth() + 1)) +
                        "/" +
                        (version.start_date
                          .getFullYear()
                          .toString()
                          .substring(2, 4) >= 10
                          ? version.start_date
                              .getFullYear()
                              .toString()
                              .substring(2, 4)
                          : "0" +
                            version.start_date
                              .getYear()
                              .toString()
                              .substring(2, 4))}
                    </TableCell>
                    <TableCell align="center" className="content no-border">
                      {(version.release_date.getDate() >= 10
                        ? version.release_date.getDate()
                        : "0" + version.release_date.getDate()) +
                        "/" +
                        (version.release_date.getMonth() + 1 >= 10
                          ? version.release_date.getMonth() + 1
                          : "0" + (version.release_date.getMonth() + 1)) +
                        "/" +
                        (version.release_date
                          .getFullYear()
                          .toString()
                          .substring(2, 4) >= 10
                          ? version.release_date
                              .getFullYear()
                              .toString()
                              .substring(2, 4)
                          : "0" +
                            version.release_date
                              .getYear()
                              .toString()
                              .substring(2, 4))}
                    </TableCell>
                    <TableCell align="left" className="content no-border">
                      {!version.description ? "--" : version.description.length > 15 ? version.description.substring(0,12)+'...': version.description}
                    </TableCell>
                    <TableCell align="left" className="no-border">
                      <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(event) =>
                          setCurrentVersionName(event, version.name)
                        }
                      >
                        <div className="action-dot-container">
                          <span className="action-dot"></span>
                          <span className="action-dot"></span>
                          <span className="action-dot"></span>
                        </div>
                      </Button>
                      {version.name === currName && (
                        <Menu
                          id={`menu-${version.name}`}
                          className="menu-shadow"
                          anchorEl={anchorEl}
                          getContentAnchorEl={null}
                          open={Boolean(anchorEl)}
                          keepMounted
                          onClose={handleClose}
                          onClick={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={() => setCurrentVersion(version)}>
                            Edit
                          </MenuItem>
                          <MenuItem
                            onClick={() => onHandleDelete(version.name)}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>

          <div className="edit-cont" onSubmit={onSubmit}>
            <input
              type="text"
              className="input-version"
              style={{ minWidth: "25%" }}
              placeholder="Version name"
              name="name"
              minLength="10"
              value={name}
              onChange={onChangeVersion}
            />
            <DatePicker
              className="input-version"
              style={{ width: "max-content" }}
              placeholderText="Start Date"
              dateFormat="dd/MM/yy"
              // minDate={new Date()}
              filterDate={(date) =>
                date.getDay() !== 6 && date.getDay() !== 0
              } /* It will prevent the sat sun from being selected as the start date or release date */
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showYearDropdown
              scrollableMonthYearDropdown
            />
            <DatePicker
              className="input-version"
              style={{ width: "max-content" }}
              placeholderText="Release Date"
              dateFormat="dd/MM/yy"
              minDate={startDate}
              // minDate={startDate > new Date() ? startDate : new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              selected={releaseDate}
              onChange={(date) => {
                if (startDate != null) {
                  setReleaseDate(date);
                } else alert("Please select the start Date First");
              }}
              showYearDropdown
              scrollableMonthYearDropdown
            />
            <input
              type="description"
              className="input-version"
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeVersion}
            />
            <Button
              type="submit"
              variant="contained"
              className="add-btn"
              onClick={onSubmit}
            >
              {currVersion === null ? "Add" : "Update"}
            </Button>
          </div>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ color: "#be5e5e", fontWeight: "bold" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            ERROR
          </Typography>
          <Typography
            style={{ fontWeight: "bold" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {modalMsg}
          </Typography>
        </Box>
      </Modal>
      {versions.length < 1 && (
        <p style={{ textAlign: "center" }}>
          No Releases Found. Please add a Release
        </p>
      )}
    </div>
  );
}

export default App;
