require 'tzinfo'

module Jekyll
  module TimeZones
    def time_converter_url(date)
      "https://www.timeanddate.com/worldclock/converter.html?iso=" +
      date.utc.strftime("%Y%m%dT%H%M%S") +
      "&p1=179&p2=224&p3=37"   
    end

    def first_time_zone(date, timezones)
      timezones ||= %w[Europe/Berlin]  
      date.getlocal(
        TZInfo::Timezone.get(timezones.first)
      ).strftime("%R %Z")   
    end

    def all_time_zones(date, timezones)
      date = date.to_time
      timezones ||= %w[Europe/Berlin]  
      timezones.map { |tz|   
        date.getlocal(
          TZInfo::Timezone.get(tz)
        ).strftime("%R %Z") 
      }.join(", ") 
    end
  end
end

Liquid::Template.register_filter(Jekyll::TimeZones)
