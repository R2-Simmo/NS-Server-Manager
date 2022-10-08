use std::process;
use std::io::prelude::*;
use std::fs;
use std::fs::File;

fn main() {
    let pid=process::id();
    let args = std::env::args();
    let mut arguments:Vec<String> =Vec::new();
    for arg in args{
        arguments.push(arg);
    }
    arguments.remove(0);
    fs::write("./pid.txt", pid.to_string()).unwrap();
    let mut file = File::create("./arguments.txt").unwrap();
    for arg in &arguments{
        file.write(arg.as_ref()).unwrap();
        file.write(b" ").unwrap();
    }
}
