# MediaTek USB VCOM Driver Installation Repository

Automated installation scripts and comprehensive documentation for MediaTek USB VCOM drivers on Windows, Linux, and macOS.

## Quick Start

### Windows Users
```batch
Right-click install-mediatek-drivers.bat
Select "Run as administrator"
Follow the on-screen menu
```

### Linux Users
```bash
chmod +x install-mediatek-drivers.sh
./install-mediatek-drivers.sh
```

### macOS Users
```bash
chmod +x install-mediatek-drivers.sh
sudo ./install-mediatek-drivers.sh
```

## What's Included

| File | Purpose |
|------|---------|
| `install-mediatek-drivers.bat` | Automated Windows installation script |
| `install-mediatek-drivers.sh` | Automated Linux/macOS installation script |
| `MEDIATEK_DRIVER_GUIDE.md` | Comprehensive installation guide |
| `.drivers/mediatek-vcom/` | Driver files directory (download separately) |

## Prerequisites

### Windows
- Administrator privileges
- Windows 7/8/10/11
- USB 2.0+ port

### Linux
- Sudo access
- Ubuntu 18.04+, Debian 10+, Fedora 30+, or CentOS 7+
- Build tools (gcc, make)

### macOS
- Administrator privileges
- macOS 10.12 or later
- Xcode command line tools

## Installation Steps

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/kashifsaeed744-dotcom/curly-memory.git
   cd curly-memory
   ```

2. **Download MediaTek USB VCOM drivers**
   - Create directory: `drivers/mediatek-vcom/`
   - Download driver files from trusted sources
   - Extract into the newly created directory

3. **Run the installation script**
   - Windows: Double-click `install-mediatek-drivers.bat`
   - Linux/macOS: Run `./install-mediatek-drivers.sh`

4. **Follow the menu prompts**
   - Select option to detect devices
   - Install drivers
   - Verify installation

## Device Information

- **Vendor ID:** 0x0E8D (MediaTek)
- **Product ID:** 0x2000 (MTK Preloader)
- **Purpose:** USB communication with MediaTek devices
- **Common Uses:** Firmware flashing, device debugging

## Troubleshooting

### Device not recognized?
- Try different USB port
- Use different USB cable
- Restart computer
- Ensure driver signature enforcement is disabled (Windows)

### Driver won't install?
- Check if running with administrator privileges
- Disable Driver Signature Enforcement (Windows 8/10/11)
- Verify driver files are in correct location
- Restart and try again

For detailed troubleshooting, see [MEDIATEK_DRIVER_GUIDE.md](./MEDIATEK_DRIVER_GUIDE.md)

## Features

✅ **Automated Installation**
- Automated detection of MediaTek devices
- One-click driver installation
- Minimal user intervention required

✅ **Multi-Platform Support**
- Windows (7, 8, 10, 11)
- Linux (Ubuntu, Debian, Fedora, CentOS)
- macOS (10.12+)

✅ **Comprehensive Documentation**
- Step-by-step guides
- Troubleshooting section
- Device information reference

✅ **User-Friendly Interface**
- Interactive menus
- Clear status messages
- Logging for debugging

## Manual Installation

If automated scripts don't work for your setup, follow the manual steps in [MEDIATEK_DRIVER_GUIDE.md](./MEDIATEK_DRIVER_GUIDE.md)

### Windows Manual
1. Disable Driver Signature Enforcement
2. Download drivers
3. Right-click device in Device Manager
4. Select "Update Driver"
5. Browse to driver folder

### Linux Manual
1. Install build tools
2. Compile driver (if source available)
3. Load kernel module
4. Verify installation

### macOS Manual
1. Install Xcode command line tools
2. Download kernel extension
3. Load with `kextload`
4. Verify installation

## Commands Reference

### Windows
```batch
# View Device Manager
devmgmt.msc

# List USB devices
wmic logicaldisk get name

# Find COM ports
mode
```

### Linux
```bash
# Detect devices
lsusb

# View available serial ports
ls /dev/ttyUSB*

# Load kernel module
sudo insmod mediatek_vcom.ko

# Check loaded modules
lsmod | grep mediatek
```

### macOS
```bash
# Detect USB devices
system_profiler SPUSBDataType

# List serial ports
ls /dev/tty.*

# Load kernel extension
sudo kextload driver.kext
```

## Security

⚠️ **Important Security Notes:**
- Download drivers only from trusted sources
- Verify driver integrity before installation
- Disable Driver Signature Enforcement only temporarily
- Keep drivers and OS updated
- Scan downloaded files with antivirus

## FAQ

**Q: Which USB port should I use?**
A: Preferably USB 2.0 ports directly on the computer, not through hubs.

**Q: Do I need to disable Driver Signature Enforcement permanently?**
A: No. After driver installation, you can re-enable it for security.

**Q: Can I use USB 3.0 ports?**
A: Yes, but USB 2.0 is recommended for compatibility.

**Q: What if my device still shows as "Unknown Device"?**
A: Try a different USB port, cable, or restart your computer. See troubleshooting guide.

**Q: Is it safe to use these drivers?**
A: Yes, when downloaded from official sources. Always verify driver authenticity.

## Support

- 📖 Full documentation: [MEDIATEK_DRIVER_GUIDE.md](./MEDIATEK_DRIVER_GUIDE.md)
- 🔍 Troubleshooting: See MEDIATEK_DRIVER_GUIDE.md Troubleshooting section
- 💬 Issues: Create an issue on GitHub for support

## Links

- [XDA Developers - MediaTek Forum](https://forum.xda-developers.com/)
- [MediaTek Official](https://www.mediatek.com/)
- [Android Development - MediaTek Resources](https://android.googlesource.com/)

## License

These scripts and documentation are provided as-is for educational and development purposes.

## Contributing

Found an issue or improvement? Feel free to:
1. Test the scripts on your system
2. Report issues or bugs
3. Suggest improvements
4. Submit pull requests

---

**Current Version:** 1.0
**Last Updated:** June 2026

---

## Next Steps

1. ✅ Download this repository
2. ✅ Download MediaTek USB VCOM drivers
3. ✅ Place drivers in `drivers/mediatek-vcom/` folder
4. ✅ Run `install-mediatek-drivers.bat` (Windows) or `install-mediatek-drivers.sh` (Linux/macOS)
5. ✅ Connect your MediaTek device and verify installation

**Happy flashing! 📱**
