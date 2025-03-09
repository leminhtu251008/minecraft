# Source file
SRC = installer_gui.c

# Resource file
RES = installer_gui.rc

# Build target is ../build/output/installer_gui.exe
BUILD_DIR = ../../build
BUILD_OUTPUT_DIR = $(BUILD_DIR)/build-output
OUTPUT_DIR = $(BUILD_DIR)/output
OBJS = $(BUILD_OUTPUT_DIR)/dongmeominecraft.o
EXE = $(OUTPUT_DIR)/dongmeominecraft.exe

# Compiler and flags
CC = gcc
CFLAGS = -Wall -mwindows
LDFLAGS = -lwinmm -lwininet -lshlwapi -lcomctl32

# Default target
all: $(EXE)

# Build target
# Create folder build-output if it doesn't exist
$(EXE): $(SRC) $(RES)
	@if not exist $(BUILD_OUTPUT_DIR) mkdir $(BUILD_OUTPUT_DIR)
	@if not exist $(OUTPUT_DIR) mkdir $(OUTPUT_DIR)
	windres $(RES) -o $(OBJS)
	$(CC) $(SRC) $(OBJS) -o $(EXE) $(CFLAGS) $(LDFLAGS)

# Clean target
clean:
	@if exist "$(OBJS)" cmd /c del "$(OBJS)"
	@if exist "$(EXE)" cmd /c del "$(EXE)"