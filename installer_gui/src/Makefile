# Compiler
CC = gcc

# Compiler flags
CFLAGS = -mwindows
LDFLAGS = -lwinmm -lwininet -lshlwapi

# Source file
SRC = installer_gui.c

# Resource file
RES = installer_gui.rc

# Build target is ../build/output/installer_gui.exe
BUILD_DIR = ../../build
BUILD_OUTPUT_DIR = $(BUILD_DIR)/build-output/installer_gui
OUTPUT_DIR = $(BUILD_DIR)/output
OBJS = $(BUILD_OUTPUT_DIR)/dongmeominecraft.o
EXE = $(OUTPUT_DIR)/dongmeominecraft.exe

# Default target
all: $(EXE)

# Build target
# Create folder build-output if it doesn't exist
$(EXE): $(SRC) $(RES)
	@if [ ! -d $(BUILD_OUTPUT_DIR) ]; then mkdir $(BUILD_OUTPUT_DIR); fi
	@if [ ! -d $(OUTPUT_DIR) ]; then mkdir $(OUTPUT_DIR); fi
	windres $(RES) -o $(OBJS)
	$(CC) $(SRC) $(OBJS) -o $(EXE) $(CFLAGS) $(LDFLAGS)

# Clean target
clean:
	@if [ -f $(OBJS) ]; then rm $(OBJS); fi
	@if [ -f $(EXE) ]; then rm $(EXE); fi