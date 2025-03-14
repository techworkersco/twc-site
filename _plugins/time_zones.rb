require 'tzinfo'

module Jekyll
  module TimeZones
    AM_PM_TIME_ZONES = ["US/Eastern", "US/Pacific", "US/Central", "US/Mountain"]

    def time_converter_url(date)
      "https://www.timeanddate.com/worldclock/converter.html?iso=" +
      date.utc.strftime("%Y%m%dT%H%M%S") +
      "&p1=179&p2=224&p3=37"   
    end

    def format_time(time, time_zone)
      if AM_PM_TIME_ZONES.include?(time_zone) 
        time.strftime("%-I:%M%P %Z")
      else
        time.strftime("%R %Z")
      end
    end  

    def relative_day_of_month(date, timezones)
      date.getlocal(TZInfo::Timezone.get(timezones.first)).strftime("%d")
    end

    def all_time_zones(date, timezones)
      date = date.to_time
      timezones ||= %w[Europe/Berlin]

      timezones.map { |tz|      
        format_time(
          date.getlocal(
            TZInfo::Timezone.get(tz)
          ), tz
        )
      }.join(", ").prepend dmy(date, timezones)
    end

    private 
    def dmy(date, timezones)
      date.getlocal(TZInfo::Timezone.get(timezones.first)).strftime("%d %B %Y – ")
    end
  end
end

Liquid::Template.register_filter(Jekyll::TimeZones)
